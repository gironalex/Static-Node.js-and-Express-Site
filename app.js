// Creating an Express Application
const express = require('express');
const app = express();
const port = 3000;

// Setting Up View Engine
app.set(`view engine`, `pug`);

// Listening for Connections
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
