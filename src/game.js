const fs = require('fs');

class Game {
  constructor()
  {
      this.id = 0;
      this.hint = '';
      this.leftAttempts = 5;
      this.missedLetters = [];
      this.guessedLetters = [];
  }

  create(id)
  {
      this.id = id;
      return new Promise((resolve, reject) => {
        return resolve({
          id : this.id,
          hint: '_ _ _ _ A',
          leftAttempts : this.leftAttempts
        });
        return reject();
      });
  }

  save(savedGames)
  {
      let data = JSON.stringify(savedGames);
      console.log(data);
      fs.writeFile('./assets/saved-games.json', data, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Saved game');
      });
  }
}

module.exports = Game;
