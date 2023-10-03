// -----------------------------------------------------------------
// This is for connecting to the database

// Import mongoose
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/e_commerce_db')
console.log('\nConnection to DB !==Successful==!')



module.exports = mongoose.connection;