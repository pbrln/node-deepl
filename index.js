const request = require('request');

const ENDPOINT = 'https://www.deepl.com/jsonrpc';

const languages = [
    'auto', 'DE', 'EN', 'FR', 'ES', 'IT', 'NL', 'PL'
];

module.exports = function (text, langFrom, langTo, callback) {
    if(callback === undefined) return new Error('No callback defined!');

    if(languages.indexOf(langFrom) === -1) {
        callback(new Error('langFrom isn\'t a valid language'), undefined)
        return;
    }
    if(languages.indexOf(langTo) === -1) {
        callback(new Error('langTo isn\'t a valid language'), undefined)
        return;
    }
    if(langTo == 'auto') {
        callback(new Error('langTo can\'t be auto'), undefined)
        return;
    }
    if(text === undefined) {
        callback(new Error('text isn\'t set'), undefined)
        return;
    }

    request.post(ENDPOINT, { body: JSON.stringify({
        "jsonrpc":"2.0",
        "method":"LMT_handle_jobs",
        "params":{
            "jobs":[
                {
                    "kind":"default",
                    "raw_en_sentence": text
                }
            ],
            "lang":{
                "user_preferred_langs":[
                    langFrom,
                    langTo
                ],
                "source_lang_user_selected":langFrom,
                "target_lang":langTo
            },
            "priority":-1
        },
        "id":42
        }) }, (err, res, body) => {
        if(err) {
            callback(err, undefined);
            return;
        }
        let b = JSON.parse(body);
        
        if(b.result.translations[0] === undefined || b.result.translations[0].beams[0] === undefined || b.result.translations[0].beams[0].postprocessed_sentence === undefined) {
            callback(new Error('unexpected error'), undefined);
            return;
        }
        callback(undefined, b.result.translations[0].beams[0].postprocessed_sentence);
    });
}