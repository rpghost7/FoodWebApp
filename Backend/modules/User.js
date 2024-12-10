
const mongoose = require('mongoose')

const { Schema } = mongoose;
// this is how you create a schema in mongoDB 
// it is useful for creating a new collection in the database
// just seach mongoDB , in that the documentation will contain the necessary parts
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location :{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserSchema);
// this creates a collection in mongoDB called user
// you can use this collection to store data in your database