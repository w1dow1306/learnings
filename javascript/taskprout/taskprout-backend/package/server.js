console.clear();
//Imports
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const config = require('./config')
const { dbrouter } = require('./routes/routes');
const { usrrouter } = require('./routes/routes');
const cookieparser = require('cookie-parser');
// const options = {
//     origin: 'http://localhost',
// }

const app = express();

//MIddle wears
app.use(bodyparser.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

// Routes
app.use('/todos', dbrouter);
app.use('/user', usrrouter);

app.use('/', (req, res) => {
    res.json({ msg: "Wow" });
})


// Start the server
app.listen(config.port, config.host, () => {
    console.log(" \x1b[32m ", `Server is running on ${config.host}:${config.port} `);
    console.log("-".repeat(100));
});
