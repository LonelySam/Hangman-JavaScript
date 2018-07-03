const express = require('express')
const app = express()
const Dictionary = require('./src/Dictionary');

Dictionary.getWord().then(word => console.log('word: ', word))

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
  Game.create()
    .then(game => {
      res.send(game)
    })
    .catch(err => {
      res.status(500).send({
        error: 'Game could not be created'
      })
    })
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
