const express = require('express')
const app = express()
const Dictionary = require('./src/Dictionary');
const GameClass = require('./src/Game');
const Game = new GameClass();

let id = 1;
let word = Dictionary.getWord().then(word => console.log('word: ', word))
let savedGames = {};

// app.get('/', (req, res) => {
//   res.send({
//       id:1,
//       hint: '_ _ _ _ _',
//       leftAttempts: 5,
//       image: `
//       |______
//       |     |
//       |    ( )
//       |     |
//       |    /|\\
//       |   / | \\
//       |     |
//       |    / \\
//       |   /   \\
//       |  /     \\
//       `
//   })
// })

app.get('/', (req, res) => {
  Game.create(id)
    .then(game => {
      savedGames[id] = game;
      id++;
      Game.save(savedGames);
      res.send(game)
    })
    // .then(Game.save(savedGames))
    .catch(err => {
      res.status(500).send({
        error: 'Game could not be created'
      })
    })

   // let secondGame = new GameClass()
   // secondGame.create(id)
   //   .then(game => {
   //     savedGames[id] = game;
   //     id++;
   //     secondGame.save(savedGames);
   //     res.send(game)
   //   })
   //   // .then(Game.save(savedGames))
   //   .catch(err => {
   //     res.status(500).send({
   //       error: 'Game could not be created'
   //     })
   //   })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

//ES2015 Template strings
// var draw = `
// |______
// |     |
// |    ( )
// |     |
// |    /|\\
// |   / | \\
// |     |
// |    / \\
// |   /   \\
// |  /     \\
// `
