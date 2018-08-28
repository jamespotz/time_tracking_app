'use strict'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'


dotenv.config()
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express()

const API_PORT = process.env.API_PORT || 3001

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors())

import routes from './routes'
routes(app)
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))