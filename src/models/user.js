const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    service: {
        type: String,
        require: true,
        trim: true
    },
    seats: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0 && value > 10) {
                throw new Error('Must be greater than 0 but less than 10')
            }
        }
    }
})

module.exports = User