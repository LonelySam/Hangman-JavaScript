const readWords = require('./word-reader.js');

class Dictionary {
  static getWord({difficulty, includeAccents} = {}) {
    let word;
    let gameCondition = false;
    return readWords({path:'./assets/es-ES.dic'})
      .then(totalWords => {
        do {
            let index = Math.floor(Math.random() * (totalWords.length - 0 + 1) + 0);
            word = totalWords[index];
            switch (difficulty) {
              case 'supereasy':
                if(word.length < 5) {
                  gameCondition = true;
                }
                break;
              case 'easy':
                if(word.length < 8) {
                  gameCondition = true;
                }
                break;
              case 'hard':
                if(word.length > 8) {
                  gameCondition = true;
                }
                break;
              default:
                gameCondition = true;
            }
        } while (!gameCondition);
        if(includeAccents === 'false') {
          return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        return word;
      })
  }
}

module.exports = Dictionary;
