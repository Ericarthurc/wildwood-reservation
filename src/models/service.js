const mongoose = require('mongoose')
const validator = require('validator')

const Service = mongoose.model('Service', {
    serviceName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    serviceSeats: {
        type: Number,
        required: true,
        trim: true,
        default: 500,
        minimum: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Must be a postive number')
            }
        }
    }
})

module.exports = Service