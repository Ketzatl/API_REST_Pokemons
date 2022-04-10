const {Sequelize, DataTypes} = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')

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

const Pokemon = PokemonModel(sequelize, DataTypes)

const initDb = () => {
    sequelize.sync({force: true})
        .then(() => {
            console.log(`Database ${db_name} has been synced successfully. \n`)

            // Insert datas into database
            // Insert all pokemons present in the mock-pokemon.js file
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types
                }).then(pokemon => console.log(pokemon.toJSON()))
            })
        })
        .catch(err => {
            console.error(`Unable to create database & tables \n`, err)
        })
}

module.exports = {
    initDb, Pokemon
}


// sequelize
//     .authenticate()
//     .then(() => {
//         console.log(`Connection to database ${db_name} has been established successfully. \n`)
//     })
//     .catch(err => {
//         console.error(`Unable to connect to the database ${db_name} \n`, err)
//     })
//
// const Pokemon = pokemonModel(sequelize, DataTypes)
//
// sequelize.sync({ force: true })
//     .then(() => {
//         console.log(`Database ${db_name} has been synced successfully. \n`)
//
//         // Insert datas into database
//         // Insert all pokemons present in the mock-pokemon.js file
//         pokemons.map(pokemon => {
//             Pokemon.create({
//                 name: pokemon.name,
//                 hp: pokemon.hp,
//                 cp: pokemon.cp,
//                 picture: pokemon.picture,
//                 types: pokemon.types.join()
//             }).then(pokemon => console.log(pokemon.toJSON()))
//         })
//     })
//     .catch(err => {
//         console.error(`Unable to create database & tables \n`, err)
//     })
