const mongoose = require('mongoose');
// the below thing is a url to connect to the database
// to connect to our database paste the name of it before ?
const mongoURL = 'mongodb+srv://rishabpillai78:now4@clusterfood.3zbyo.mongodb.net/FoodDeliveryy?retryWrites=true&w=majority&appName=Clusterfood';
// above put the mongodb URL which you have with your database and replace the username and the collection with what you want



// alternative approach which also works
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');

        const fetch_data = await mongoose.connection.db.collection("sample1");
        const data = await fetch_data.find({}).toArray();
        global.food_items= data;
        
        const fetch_data2 = await mongoose.connection.db.collection("sample2");
        const catData = await fetch_data2.find({}).toArray();
        global.food_category=catData;
        



    } catch (error) {
        console.error("Error during MongoDB operation:", error);
    }
};
module.exports = mongoDB;

// for some reason while writing a callback function inside toArray it doesn't work but using async await works perfectly, try and figure out why
