const chalk = require('chalk')

const validateCheck = async (req, res, next) => {
    console.log('Middleware 1')
    const isEmptyOne = Object.values(req.body[0]).some(x => (x === null || x === ''))
    console.log(isEmptyOne)
    const isEmptyTwo = Object.values(req.body[1]).some(x => (x === null || x === ''))
    console.log(isEmptyTwo)

    if (isEmptyOne || isEmptyTwo) {
        res.status(400).send({ error: 'Data contained empty value!' })
        return console.log(chalk.red('failed'))
    }
    console.log(chalk.green('passed!'))
    next()
}

module.exports = validateCheck