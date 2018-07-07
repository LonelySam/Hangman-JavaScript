const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDb = require('./json-db.js')

class Game {
	constructor({word, hint, leftAttempts = 5} = {}) {
		this.word = word
		this.hint = hint
		this.leftAttempts = leftAttempts
	}

	static create() {
		return Dictionary.getWord()
			.then(word => {
				const newGame = new Game({
					word: word,
					hint: Game.createHint(word)
				})
				newGame.id = crypto.randomBytes(12).toString('hex');
				return JSONDb.save(newGame)
			})
			.then(savedGame => {
				delete savedGame.word
				return savedGame;
			})
	}

	static createHint(word) {
		const wordLength = word.length
		const index = Math.floor(Math.random() * wordLength);
		const arrayWord = Array.from(word);
		const letter = arrayWord[index];
		return arrayWord.map(ch => ch === letter ? ch : '_').join(' ')
	}

	static attempt(gameId, attempt) {
		return JSONDb.getGameById(gameId)
			.then(game => {
				if (game.word.includes(attempt.letter)) {
					// TODO udpate hint and save that
					return game;
				}
				if(game.leftAttempts > 0){
						game.leftAttempts--;
						game.isInvalid = true;
				} else {
					game.isGameOver = true;
				}
				return JSONDb.save(game);
			})
			.then(savedGame => {
				delete savedGame.word;
				return savedGame;
			})
			.catch()
	}
}

module.exports = Game
