const express = require('express')
const app = express()
const mongoDB = require("./db");

mongoDB();
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});