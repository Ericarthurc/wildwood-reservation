const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
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