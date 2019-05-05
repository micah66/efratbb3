// import express from 'express'
const express = require('express')
const standings = require('./standings').standings
const app = express()
const port = 5000

app.use('/standings', standings)

app.use('/', (req, res) => {
  res.send('Efrat Baseball homepage')
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
