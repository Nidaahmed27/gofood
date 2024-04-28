const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');


router.post("/OrderData", async (req, res) => {
    try {
        const { email, Order_data } = req.body;
        await req.body.Order_data.splice(0, 0, { order_date: req.body.order_date })
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create a new order if it doesn't exist
            await Order.create({ email, order: [Order_data] });
        } else {
            // Update existing order by pushing new data
            existingOrder.Order_data.push([...Order_data]);
            await existingOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/MyOrder", async (req, res) => {
    try {

        let myData = await Order.findOne({ 'email': req.body.email });

        if (myData) {
            res.json({ orderData: myData });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
