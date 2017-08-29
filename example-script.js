const translate = require('./index');

translate("Hello there, what's going on?", "EN", "DE", (err, res) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Result: ', res);
});