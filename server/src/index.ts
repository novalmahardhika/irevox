import express from 'express'
import router from './routes/index'
import chalk from 'chalk'

const app = express()
const port = 4000

// middleware
app.use(express.json())

// route
app.use('/', router)

// server
app.listen(port, () => {
  console.log(
    `Server running at ${chalk.magentaBright(`http://localhost:${port}`)}`
  )
})
