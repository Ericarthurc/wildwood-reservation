const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.use(express.json());

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send('Express Error from Ericarthurc', e)
    }
})

router.post('/users/login', auth, async (req, res) => {
    res.send(req.body)
})

module.exports = router