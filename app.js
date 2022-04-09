const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = 3000

// MIDDLEWARES
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())
    .use(bodyParser.json())

sequelize.initDb()

// TODO : Create Endpoints

app.listen(port, () => console.log(`\n Node App is running on : http://localhost:${port} \n`))


// Middleware Méthode 1 : Affiche dans le terminal le nom de la route et la méthode
/*const loggerTerminal = (req, res, next) => {
  console.log(`${req.host} - ${req.method} : ${req.url}`)
  next()
}
app.use(loggerTerminal)*/

// Middleware Méthode 2 (plus courte) : Affiche dans le terminal le nom de la route et la méthode
/*app.use((req, res, next) => {
  console.log(`${req.host} - ${req.method} : ${req.url}`)
  next()
})*/
