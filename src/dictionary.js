const readWords = require('./word-reader.js');

const gameLevels = {
  supereasy: wordLength => wordLength <= 5,
  easy: wordLength => wordLength > 5 && wordLength <= 8,
  hard: wordLength => wordLength > 8,
}

class Dictionary {
  static getWord({difficulty = 'easy', includeAccents = 'false'} = {}) {
    let word;
    let gameCondition = false;
    const levelValidation = gameLevels[difficulty];
    return readWords({path:'./assets/es-ES.dic'})
      .then(totalWords => {
        do {
            let index = Math.floor(Math.random() * (totalWords.length - 0 + 1) + 0);
            word = totalWords[index];
            gameCondition = levelValidation(word.length)
        } while (!gameCondition);
        if(includeAccents === 'false') {
          return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        return word;
      })
  }
}

module.exports = Dictionary;
