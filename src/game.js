const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDb = require('./json-db.js')

class Game {
	constructor({word, hint, leftAttempts = 5} = {}) {
		this.word = word
		this.hint = hint
		this.leftAttempts = leftAttempts
	}

	static create({difficulty = 'easy', includeAccents = false, maxAttempts = 5} = {}) {
		return Dictionary.getWord({difficulty, includeAccents})
			.then(word => {
				const newGame = new Game({
					word: word,
					hint: Game.createHint(word),
					leftAttempts: maxAttempts
				})
				newGame.id = crypto.randomBytes(12).toString('hex');
				return JSONDb.save(newGame)
			})
			.then(savedGame => {
				// The following line would delete the word of a game before when a new game is created
				// delete savedGame.word
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

	static replaceLetterInHint(attempt, game) {
		let arrayHint = Array.from(game.hint.split(' ').join(''))
		Array.from(game.word).forEach((ch, i) => {
			if(ch === attempt.letter) {
				arrayHint[i] = ch;
			}
		})
		return arrayHint.join(' ');
	}

	static attempt(gameId, attempt) {
		return JSONDb.getGameById(gameId)
			.then(game => {
				if (game.word.includes(attempt.letter)) {
					game.hint = Game.replaceLetterInHint(attempt, game);
				}
				else if(game.leftAttempts > 0){
						game.leftAttempts--;
						game.isInvalid = true;
				} else {
					game.isGameOver = true;
				}
				return JSONDb.save(game);
			})
			.then(savedGame => {
				//// The following line is commented because deleting the word from game would crash the Hangmann in a next attempt
				// delete savedGame.word;
				return savedGame;
			})
	}
}

module.exports = Game
