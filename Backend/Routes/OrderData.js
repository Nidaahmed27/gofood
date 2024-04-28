// const express = require('express');
// const router = express.Router();
// const Order = require('../Models/Orders');

// router.post("/OrderData", async (req, res) => {

//     let data = req.body.Order_data;
//     console.log(data)
//     // await data.splice(0, 0, { Order_date: req.body.Order_date })
//     let eId = await Order.findOne({ 'email': req.body.email })
//     console.log(eId)
//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 Order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         }

//         catch (error) {
//             console.error(error.message);
//             res.send("server error", error.message)
//         }

//     }
//     else {
//         try {
//             await Order.findOneAndUpdate({ email: req.body.email },
//                 {
//                     $push: { Order_data: data }
//                 }).then(() => {
//                     res.json({ success: true })
//                 })

//         } catch (error) {
//             res.send("server error", error.message)
//         }

//     }



// });
// module.exports = router;
// orders.js (server-side route file)

const express = require('express');
const router = express.Router();
const Order = require('../Models/Orders');

router.post("/OrderData", async (req, res) => {
    try {
        const { email, Order_data } = req.body;
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            // Create a new order if it doesn't exist
            await Order.create({ email, Order_data });
        } else {
            // Update existing order by pushing new data
            existingOrder.Order_data.push(...Order_data);
            await existingOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
