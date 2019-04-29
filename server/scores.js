const express = require('express')
const fs = require('fs')

const standings = express.Router()

let games = JSON.parse(fs.readFileSync('./scores.json').toString())

module.exports = { standings, games }

standings.get('/', (req, res) => {
  res.send(games)
})
