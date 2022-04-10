const { Pokemon } = require('../db/sequelize')

// @route   GET /api/pokemon : Get all Pokemons in database
module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({ message, data: pokemons })
            })
    })
}
