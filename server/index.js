// import express from 'express'
const express = require('express')
const router = require('/scores')
const app = express()
const port = 5000

app.use('/standings', router.standings)
app.use('/', (req, res) => {
  res.send('Efrat Baseball homepage')
})

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
