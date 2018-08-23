'use strict'

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'


const app = express()
const router = express.Router()

const API_PORT = process.env.API_PORT || 3001

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

router.get('/', (request, response) => {
  response.json({
    message: 'Hello, World!'
  })
})

app.use('/api', router)
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))