const express = require('express');
const chalk = require('chalk');
const history = require('connect-history-api-fallback');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
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

const loadJSONData = (database) => {
    try {
        const dataBuffer = fs.readFileSync(database)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const saveJSONData = (data, database) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(database, dataJSON)
};

app.get('/api/randomNum', (req, res) => {
    const randomNum = Math.floor(Math.random() * 100) + 1
    console.log(chalk.magenta(randomNum))
    res.send({ 'number': randomNum })
});

app.get('/api/dataNum', (req, res) => {
    const data = loadJSONData('number.json')
    console.log(data)
    res.send(data)
});

app.post('/api/test', (req, res) => {
    console.log(req.body)
    const data = loadJSONData('data.json')
    data.push({
        form1: req.body[0].form1,
        form2: req.body[1].form2,
        form3: req.body[2].form3,
        form4: req.body[3].form4
    })
    saveJSONData(data, 'data.json')
    res.send({ 'number': 9000 })
    // console.log(req.body.topic[0].name)
});

app.get('/', function (req, res) {
    res.render(path.join('../frontend/build/index.html'))
});

if (require.main === module) {
    app.listen(port, () => console.log(chalk.blue(`Server started on port ${port}!`)))
};
