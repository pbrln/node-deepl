## node-deepl
Translation package using deepl.com's undocumented API.

## Installation
```npm install node-deepl --save``` or if you are using yarn ```yarn add node-deepl```

## Usage
```javascript
const translate = require('node-deepl');

translate("Hello there, what's going on?", "EN", "DE", (err, res) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('Result: ', res);
});
```

## Languages
|Code|Language|
|----|----|
|auto|Autodetect (input only!)|
|DE|German|
|EN|English|
|FR|French|
|ES|Spanish|
|IT|Italian|
|NL|Dutch|
|PL|Polish|