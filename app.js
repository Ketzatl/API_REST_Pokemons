const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { Sequelize, DataTypes } = require('sequelize')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')
const pokemonModel = require('./src/models/pokemon')


const app = express()
const port = 3000

const db_name = 'pokedex-udemy'
const db_username = 'root'
const db_password = ''
const db_host = 'localhost'

// Connexion à la base de données
const sequelize = new Sequelize(
    // db name
    `${db_name}`,
    // username mariadb
    `${db_username}`,
    // password mariadb
    `${db_password}`,
    {
  host: `${db_host}`,
  dialect: 'mariadb',
        dialect_options: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
})

sequelize
    .authenticate()
    .then(() => {
        console.log(`Connection to database ${db_name} has been established successfully. \n`)
    })
    .catch(err => {
        console.error(`Unable to connect to the database ${db_name} \n`, err)
    })

const Pokemon = pokemonModel(sequelize, DataTypes)

sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database ${db_name} has been synced successfully. \n`)
    })
    .catch(err => {
        console.error(`Unable to create database & tables \n`, err)
    })

// MIDDLEWARES
app
    // .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(express.json())
    .use(bodyParser.json())



app.get('/', (req,res) => res.send('API REST Pokemons'))


// READ ALL Pokemons
app.get('/api/pokemons', (req, res) => {
    const message = 'All Pokemons have been retrieved successfully. \n'
    res.json(success(message, pokemons))
})

// READ BY ID Pokemon
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'The Pokemon has been retrieved successfully. \n'
    res.json(success(message, pokemon))
})

// CREATE Pokemon
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Pokemon ${pokemonCreated.name} has been created successfully. \n`
    res.json(success(message, pokemonCreated))
})

// UPDATE Pokemon
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `The Pokemon ${pokemonUpdated.name} has been updated successfully. \n`
    res.json(success(message, pokemonUpdated))
});

// DELETE Pokemon
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `The Pokemon ${pokemonDeleted.name} has been deleted successfully. \n`
    res.json(success(message, pokemonDeleted))
});

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
