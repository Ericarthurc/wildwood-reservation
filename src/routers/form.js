const express = require('express')
const User = require('../models/user')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const validateCheck = require('../middleware/validateCheck')
const emailCheck = require('../middleware/emailCheck')
const router = new express.Router()
const chalk = require('chalk')

router.use(express.json());

// LOOK INTO MONGOOSE-TRANSACTIONS

router.post('/forms/services', [validateCheck, emailCheck], async (req, res) => {
    console.log(req.body)
    console.log(req.body[0].serviceSeats)
    const user = new User(req.body[1])

    try {
        console.log(chalk.magenta('STEP 1: findbyID'))

        const currentService = await Service.findById(req.body[0]._id)
        if (!currentService) {
            console.log('bad service id')
            return res.status(422).send({ error: 'Service ID not found!' })
        }

        console.log(chalk.magenta('STEP 2: findbyIDandUpdate'))

        const currentSeats = await Service.findByIdAndUpdate(req.body[0]._id, {
            $set: { serviceSeats: currentService.serviceSeats - req.body[0].serviceSeats }
        }, { new: true, runValidators: true })
        if (!currentSeats) {
            console.log('bad service id')
            return res.status(422).send({ error: 'Service ID not found!' })
        }

        console.log(chalk.green('STEP 3: Save user'))

        await user.save()
        res.status(201).send(user)
    } catch (e) {
        if (e.name == 'ValidationError') {
            return res.status(406).send({ error: 'Not enough seats available in selected service!' })
        }
        res.status(500).send()
    }
})

module.exports = router