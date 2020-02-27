const mongoose = require('mongoose');
const chalk = require('chalk');

const dbPath = process.env.MONGO_URI;
mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', () => {
  console.log(chalk.red('Error occurred from the database'));
});
db.once('open', () => {
  console.log(chalk.cyan.underline.bold('Successfully opened the database'));
});
module.exports = mongoose;
