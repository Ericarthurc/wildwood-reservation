const auth = async (req, res, next) => {
    try {
        // console.log(req.body)
        const secret = req.body.secret
        const pin = req.body.pin
        if (secret == process.env.SECRET && pin == process.env.PIN) {
            // console.log('PASSED')
            next()
        } else {
            throw new Error()
        }
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." })
    }
}


module.exports = auth