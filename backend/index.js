const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT;

require('./routes')(app);
const server = app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

const closeServer = () => {
    server.close(() => {
        console.log("server closed");
        process.exit();
    })
}

process.on('SIGTERM', closeServer);
process.on('SIGINT', closeServer);

