const express = require('express');
const chalk = require('chalk');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;
const staticFileMiddleware = express.static(path.join('./frontend/build'));
app.use(staticFileMiddleware);
app.use(history());
app.use(cors());
app.use(staticFileMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

app.get('/api/randomNum', (req, res) => {
    const randomNum = Math.floor(Math.random() * 100) + 1
    console.log(chalk.magenta(randomNum))
    res.send({ 'number': randomNum })
});

app.get('/', function (req, res) {
    res.render(path.join('../frontend/build/index.html'))
});

if (require.main === module) {
    app.listen(port, () => console.log(chalk.blue(`Server started on port ${port}!`)))
};
