const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('Hello Sam !'));
app.get('/api/pokemons/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Vous avez demandé le Pokemon N°${id}`);
});

app.listen(port,
    () => console.log(`Application Express démarré sur : http://localhost:${port}`));
