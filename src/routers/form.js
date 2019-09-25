const express = require('express')
const User = require('../models/user')
const Service = require('../models/service')
const sendSignUpEmail = require('../emails/account')
const validateCheck = require('../middleware/validateCheck')
const emailCheck = require('../middleware/emailCheck')
const router = new express.Router()
const chalk = require('chalk')

router.use(express.json());

// LOOK INTO MONGOOSE-TRANSACTIONS
// Throw new Error in the if() will send a 'e' in the try catch

router.post('/forms/services', [validateCheck, emailCheck], async (req, res) => {
    const user = new User(req.body[1])

    try {
        const currentService = await Service.findById(req.body[0]._id)
        if (!currentService) {
            return res.status(422).send({ error: 'Service ID not found!' })
        }

        const currentSeats = await Service.findByIdAndUpdate(req.body[0]._id, {
            $set: { serviceSeats: currentService.serviceSeats - req.body[0].serviceSeats }
        }, { new: true, runValidators: true })
        if (!currentSeats) {
            return res.status(422).send({ error: 'Service ID not found!' })
        }

        await user.save()
        sendSignUpEmail(req.body[1].email, req.body[1].name, req.body[1].service, req.body[1].seats)
        res.status(201).send(user)
    } catch (e) {
        if (e.name == 'ValidationError') {
            return res.status(406).send({ error: 'Not enough seats available in selected service!' })
        }
        res.status(500).send()
    }
})

module.exports = router