const mongoose = require('mongoose')
const validator = require('validator')

const Service = mongoose.model('Service', {
    serviceName: {
        type: String,
        require: true,
        trim: true
    },
    serviceSeats: {
        type: Number,
        require: true,
        trim: true,
        default: 500,
        validate(value) {
            if (value < 0) {
                throw new Error('Must be a postive number')
            }
        }
    }
})

module.exports = Service