const express = require('express');
const router = express.Router();

router.post("/FoodItems", async (req, res) => {
    try {
        // console.log("Fetched data:", global.foods);
        res.send([global.foods, global.foodcategory]);
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }

})

module.exports = router;