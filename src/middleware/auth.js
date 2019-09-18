const keys = require('../keys/keys')

const auth = async (req, res, next) => {
    try {
        const login = Object.values(req.body).toString()
        console.log(req.body)
        const token = Object.values(keys.adminLogin).toString()
        if (token === login) {
            next()
        } else {
            throw new Error()
        }
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }
}


module.exports = auth