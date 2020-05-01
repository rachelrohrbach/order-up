'use strict';
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const ActiveOrderSchema = new Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  order: [
    {
      itemSeat: {
        type: Number,
        required: true
      },
      itemName: {
        type: String,
        required: true
      },
      itemPrepareTime: {
        type: Number,
        required: true
      }
    }
  ],
  orderInTime: {
    type: String,
    required: true,
    default: Date.now()
  }
});
module.exports = mongoose.model(`ActiveOrder`, ActiveOrderSchema);