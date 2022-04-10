const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            const pokemonDeleted = pokemon;
            Pokemon.destroy({
                where: { id: pokemon.id }
            })
                .then(_ => {
                    const message = `The Pokemon ${pokemonDeleted.name} with id N°${pokemonDeleted.id}, has been deleted successfully.`;
                    res.json({message, data: pokemonDeleted })
                })
        })
    })
}
