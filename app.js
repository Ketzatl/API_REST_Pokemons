const express = require('express');
const app = express();

const port = 3000;

app.get('/',
    (req, res) => res.send('Hello Sam !'));

app.listen(port,
    () => console.log(`Application Express démarré sur : http://localhost:${port}`));
