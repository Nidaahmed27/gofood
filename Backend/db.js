const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/gofood';

const mongoDB = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true });

        console.log("Connected to MongoDB");


        const FetchData = await mongoose.connection.db.collection("foods");
        const data = await FetchData.find({}).toArray();
        global.foods = data;
        const Foodcategory = await mongoose.connection.db.collection("foodcategory");
        const catdata = await Foodcategory.find({}).toArray();
        global.foodcategory = catdata;
        // console.log("Fetched data:", global.foods);
        // console.log("Food data:", global.foodcategory);


    }

    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = mongoDB;

