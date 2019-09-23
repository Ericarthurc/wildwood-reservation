const User = require('../models/user')
const chalk = require('chalk')

const emailCheck = async (req, res, next) => {
    console.log('Middleware 2')
    try {
        console.log(chalk.blue('checking email'))
        const userEmail = await User.findOne({ email: req.body[1].email })
        if (userEmail) {
            res.status(422).send({ error: 'Data contained email already in use!' })
            return console.log(chalk.red('found user with email; failed!'))
        }
        console.log(chalk.green('No user with that email; passed!'))
        next()
    } catch (e) {
        res.status(500).send({ error: 'Database error!' })
    }
}

module.exports = emailCheck