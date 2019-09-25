const validator = require('validator')
const chalk = require('chalk')

const validateCheck = async (req, res, next) => {
    const isEmptyOne = Object.values(req.body[0]).some(x => (x === null || x === ''))
    const isEmptyTwo = Object.values(req.body[1]).some(x => (x === null || x === ''))

    if (validator.isEmail(req.body[1].email)) {
        if (isEmptyOne || isEmptyTwo) {
            return res.status(400).send({ error: 'Data contained empty value!' })
        } else {
            next()
        }
    } else {
        res.status(400).send({ error: 'Email failed validator check!' })
    }

}

module.exports = validateCheck