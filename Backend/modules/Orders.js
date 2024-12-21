
const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: { type: String, required: true },
    orders: [
      {
        date: { type: Date, required: true },
        order_data: { type: Array, required: true },
      },
    ],
  });
  

module.exports = mongoose.model('order', OrderSchema);
// creating a schema for orders