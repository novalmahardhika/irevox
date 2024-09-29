import express from 'express'
import cors from 'cors'
import router from './routes/index'
import chalk from 'chalk'

const app = express()
const port = 4000

// middleware
app.use(express.json())

app.use(cors())

// route
app.use('/', router)

// server
app.listen(port, () => {
  console.log(
    `Server running at ${chalk.magentaBright(`http://localhost:${port}`)}`
  )
})
