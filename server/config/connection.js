// -----------------------------------------------------------------
// This is for connecting to the database

// Import mongoose
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e_commerce_db')
console.log('\nConnection to DB !==Successful==!')



module.exports = mongoose.connection;