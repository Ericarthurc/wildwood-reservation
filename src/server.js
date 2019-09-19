const express = require('express');
require('./db/mongoose')
const userRouter = require('./routers/user')
const serviceRouter = require('./routers/service')

const chalk = require('chalk');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(userRouter)
app.use(serviceRouter)
app.use(express.static('dist'));
app.use(history());
app.use(cors());
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/api/randomNum', (req, res) => {
//     const randomNum = Math.floor(Math.random() * 100) + 1
//     console.log(chalk.magenta(randomNum))
//     res.send({ 'number': randomNum })
// });

app.get('*', (req, res) => {
    res.send({ error: '404' })
})

if (require.main === module) {
    app.listen(port, () => console.log(chalk.blue(`Server started on port ${port}!`)))
};
