const express = require('express')
const User = require('../models/user')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const router = new express.Router()
const chalk = require('chalk')

router.use(express.json());

router.post('/forms/submit', async (req, res) => {
    console.log(req.body)
    console.log(req.body[0].serviceSeats)
    const user = new User(req.body[1])

    try {
        console.log(chalk.green('STEP1: check email'))
        const userEmail = await User.findOne({ email: req.body[1].email })
        if (userEmail) {
            console.log('found user with email')
            return res.status(422).send()
        }

        console.log(chalk.green('STEP2: email passed; check seats update'))
        const currentService = await Service.findById(req.body[0]._id)
        if (!currentService) {
            console.log('bad service id')
            return res.status(423).send()
        }

        const currentSeats = await Service.findByIdAndUpdate(req.body[0]._id, {
            $set: { serviceSeats: currentService.serviceSeats - req.body[0].serviceSeats }
        }, { new: true, runValidators: true })
        if (!currentSeats) {
            console.log('bad service id')
            return res.status(424).send()
        }

        console.log(chalk.green('STEP3: seats passed; save user'))
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        console.log(e)
        if (e.name == 'ValidationError') {
            if (e.errors.serviceSeats) {
                console.log(e)
                return res.status(406).send()
            }
            return res.status(409).send()
        }
        res.status(400).send()
    }
})

module.exports = router