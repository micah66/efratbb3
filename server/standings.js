const express = require('express')
const fs = require('fs')

const standings = express.Router()

let games = JSON.parse(fs.readFileSync('./scores.json').toString())

const gamesResultsByTeam = games.reduce((gameResultsByTeam, game) => {
  const awayTeamName = game.away.name
  const homeTeamName = game.home.name

  ;[awayTeamName, homeTeamName].forEach(teamName => {
    const existingGamesForThisTeam = gameResultsByTeam[teamName] || []
    gameResultsByTeam[teamName] = existingGamesForThisTeam

    gameResultsByTeam[teamName].push(game)
  })

  return gameResultsByTeam
}, {})

// console.log(gamesResultsByTeam['Pina Chama'])

const isHomeTeam = (teamName, gameResult) => gameResult.home.name === teamName

const statsFromGameResults = (teamName, gameResults) => {
  return gameResults.reduce((statsSoFar, gameResult) => {
    const selectedTeamScore = isHomeTeam(teamName, gameResult) ? gameResult.home.score : gameResult.away.score
    const opponentTeamScore = isHomeTeam(teamName, gameResult) ? gameResult.away.score : gameResult.home.score
    if (selectedTeamScore === opponentTeamScore) statsSoFar.t++
    else {
      selectedTeamScore > opponentTeamScore ? statsSoFar.w++ : statsSoFar.l++
    }

    statsSoFar.rs += selectedTeamScore
    statsSoFar.ra += opponentTeamScore

    return statsSoFar
  }, { w: 0, l: 0, t: 0, rs: 0, ra: 0 })
}

const statsByTeam = Object.keys(gamesResultsByTeam).reduce((statsByTeamSoFar, teamName) => {
  const gameResultsBySpecificTeam = gamesResultsByTeam[teamName]
  const stats = statsFromGameResults(teamName, gameResultsBySpecificTeam)
  stats.wp = (stats.w / gameResultsBySpecificTeam.length).toFixed(3)
  stats.rd = stats.rs - stats.ra

  statsByTeamSoFar[teamName] = stats

  return statsByTeamSoFar
}, {})

console.log(statsByTeam)
module.exports = { standings }

standings.get('/', (req, res) => {
  res.send(statsByTeam)
})
