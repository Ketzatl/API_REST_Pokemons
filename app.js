const express = require('express')
const morgan = require('morgan')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))


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


app.get('/', (req,res) => res.send('Hello again, Express !'))

// On retourne la liste des pokémons au format JSON, avec un message :
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
})

// Retourne un Pokemon en fonction de son ID
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

app.listen(port, () => console.log(`Node App is running on : http://localhost:${port}`))









// const loggerFile = (req, res, next) => {
//     const fs = require('fs')
//     const loggerFile = fs.createWriteStream('log.txt', {
//         flags: 'a' //'a' means appending (old data will be preserved)
//     })
//
//     loggerFile.write(`${req.host} - ${req.method} : ${req.url}`) //append string to your file
//     next()
// }
// app.use(loggerFile)



// var fs = require('fs')
// var loggerFile = fs.createWriteStream('log.txt', {
//     flags: 'a' //'a' means appending (old data will be preserved)
// })
//
// loggerFile.write(`${req.host} - ${req.method} : ${req.url}`) //append string to your file
