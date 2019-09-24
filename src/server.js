const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')
const formRouter = require('./routers/form')

const chalk = require('chalk');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3123;
app.use(cors());
app.use(userRouter)
app.use(serviceRouter)
app.use(formRouter)
app.use(express.static('./frontend/build'));
app.use(history());
app.use(cors());
app.use(express.static('./frontend/build'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('*', (req, res) => {
    res.send({ error: '404' })
})

if (require.main === module) {
    app.listen(port, () => console.log(chalk.blue(`Server started on port ${port}!`)))
};


// mongod --dbpath=/Users/ericarthurc/mongodb-data