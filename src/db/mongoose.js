const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/reservation-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (e) => {
    if (e) {
        console.log('Failed to connect to mongoDB')
    } else {
        console.log('Connected to mongoose successfully!')
    }
})