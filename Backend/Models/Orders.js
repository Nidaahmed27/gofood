const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    Order_data: {
        type: Array,
        required: true,
    }
    // order_date: {
    //     type: Date,
    //     required: true
    // }
});
module.exports = mongoose.model('Order', OrderSchema);