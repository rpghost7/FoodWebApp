const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://rishabpillai78:now4@clusterfood.3zbyo.mongodb.net/FoodDeliveryy?retryWrites=true&w=majority&appName=Clusterfood';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to the database");

        // Access collection after connection
        const fetch_data = await mongoose.connection.db.collection("sample1"); 
        const data = await fetch_data.find().toArray();
        // console.log(data);
        // so now it is working with async and await but not promises and then
    } catch (err) {
        console.log("An error has occured :",err);
    }
}

module.exports = mongoDB;