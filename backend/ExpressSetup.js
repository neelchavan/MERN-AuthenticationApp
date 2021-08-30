/* eslint-disable no-console */
import express from 'express'
import Mongoose from 'mongoose'
import cors from 'cors'

import userRouter from './src/routers/user.js'
import taskRouter from './src/routers/task.js'

class ExpressSetup {
  constructor() {
    this.app = express()
  }

  static connectDatabase() {
    Mongoose.connect(
      'mongodb://127.0.0.1:27017/authentication-app',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
      (e) => {
        if (e) {
          return console.log(e)
        }
        return console.log('Database Connected')
      }
    )
  }

  setMiddlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(userRouter)
    this.app.use(taskRouter)
  }

  hello() {
    this.app.get('/', (req, res) => {
      res.send('hello')
    })
  }

  listenServer() {
    const PORT = 4000
    this.app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`)
    })
  }
}

export default ExpressSetup
