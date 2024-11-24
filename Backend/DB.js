const mongoose = require('mongoose');
// the below thing is a url to connect to the database
// to connect to our database paste the name of it before ?
const mongoURL = 'mongodb+srv://rishabpillai78:now4@clusterfood.3zbyo.mongodb.net/FoodDeliveryy?retryWrites=true&w=majority&appName=Clusterfood';

const mongoDB = () => {
    mongoose.connect(mongoURL)
        .then(() => {
            console.log('Connected to MongoDB');
            return mongoose.connection.db.collection("sample1");
        })
        .then((fetch_data) => {
            // Return the Promise from `toArray()`
            return fetch_data.find({}).toArray();
        })
        .then(() => {
            // Log the fetched data
            // console.log("Fetched data:", data);
            console.log('data will be displayed');
        })
        .catch((err) => {
            console.error("Error:", err);
        });
};

module.exports = mongoDB;

// alternative approach which also works
// const mongoDB = async () => {
//     try {
//         await mongoose.connect(mongoURL);
//         console.log('Connected to MongoDB');
        
//         const fetch_data = mongoose.connection.db.collection("sample1");
//         const data = await fetch_data.find({}).toArray();
//         console.log("Fetched data:", data);
//     } catch (error) {
//         console.error("Error during MongoDB operation:", error);
//     }
// };
