import express from "express"
import ViteExpress from "vite-express"

import mongoose from "mongoose"
import bodyParser from "body-parser"

import { config } from "dotenv"

import router from "./src/router/index.js"

try {
  config()
  
  const app = express()
  app.use(bodyParser.json())

  try {
    mongoose.connect(process.env.MONGO_URI)
    const db = mongoose.connection
  
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    db.once('open', () => console.log('Connected to MongoDB'))
  } catch (e) {
    console.log(e)
  }

  app.use('/api', router)

  const port = process.env.PORT || 3001
  ViteExpress.listen(app, port, () =>console.log(`Server is listening on port http://localhost:${port}`))
  
} catch (error) {
  console.log(error)
}



