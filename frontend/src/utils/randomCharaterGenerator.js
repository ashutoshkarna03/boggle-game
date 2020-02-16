// let randomWords = require('random-words');
// import randomWords from 'random-words';
// function to generate array of random characters of given length
function randomCharacterGenerator(length) {
    let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        // result += characters.charAt(Math.floor(Math.random() * charactersLength));
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
    }
    return result;
}

// console.log(randomWords({exactly: 5, maxLength: 5}))

export {randomCharacterGenerator}
