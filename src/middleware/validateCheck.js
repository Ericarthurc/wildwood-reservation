const validator = require('validator')
const chalk = require('chalk')

const validateCheck = async (req, res, next) => {
    console.log('Middleware 1')
    const isEmptyOne = Object.values(req.body[0]).some(x => (x === null || x === ''))
    console.log(isEmptyOne)
    const isEmptyTwo = Object.values(req.body[1]).some(x => (x === null || x === ''))
    console.log(isEmptyTwo)

    if (validator.isEmail(req.body[1].email)) {
        if (isEmptyOne || isEmptyTwo) {
            res.status(400).send({ error: 'Data contained empty value!' })
            return console.log(chalk.red('failed'))
        } else {
            console.log(chalk.green('passed!'))
            next()
        }
    } else {
        console.log('Email failed validator check!')
        res.status(400).send({ error: 'Email failed validator check!' })
    }

}

module.exports = validateCheck