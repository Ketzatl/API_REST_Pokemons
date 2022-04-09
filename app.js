const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

// MIDDLEWARES
app
    // .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())
    .use(bodyParser.json())



app.get('/', (req,res) => res.send('Hello again, Express !'))


// READ ALL Pokemons
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
})

// READ BY ID Pokemon
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
})

// CREATE Pokemon
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

// UPDATE Pokemon
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
});

// DELETE Pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
});

app.listen(port, () => console.log(`Node App is running on : http://localhost:${port}`))



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
