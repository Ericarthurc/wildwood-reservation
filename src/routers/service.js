const express = require('express')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/services', auth, async (req, res) => {
    const service = new Service(req.body)

    try {
        await service.save()
        res.status(201).send(service)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/services', async (req, res) => {
    try {
        const services = await Service.find({})
        res.send(services)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/services/:id', async (req, res) => {
    // console.log(req.body)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['serviceSeats']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update!' })
    }

    if (req.body.serviceSeats > 10) {
        return res.status(406).send({ error: 'Seat value has to be 10 or below' })
    }

    try {
        const service = await Service.findById(req.params.id)
        await Service.findByIdAndUpdate(req.params.id, {
            $set: { serviceSeats: service.serviceSeats - req.body.serviceSeats }
        }, { new: true, runValidators: true })
        if (!service) {
            return res.status(404).send()
        }

        res.send(service)
    } catch (e) {
        if (e.name == 'ValidationError') {
            console.error('Error Validating')
            res.status(406).send(e)
        } else {
            res.status(400).send(e)
        }
    }
})

module.exports = router

// try {
//     const service = await Service.findByIdAndUpdate(req.params.id, {
//         $inc: { serviceSeats: -req.body.serviceSeats }
//     }, { new: true, runValidators: true })

//     if (!service) {
//         return res.status(404).send()
//     }

//     res.send(service)
// } catch (e) {
//     console.log(e)
//     res.status(400).send(e)
// }