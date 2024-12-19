const express = require("express");
const router = express.Router();
const cors = require('cors');

require('dotenv').config() //required to use env
const PORT = 8000;

const app = express();
const LocationRouter = require("./routes/locationRouters.js")
const BhkRouter = require("./routes/bhkRouter.js")
const PredictRouter = require("./routes/predictRouter.js")

app.use(express.json()); //if we get json as req then it accepts
app.use(express.urlencoded({ extended: false })); //not only postman in live server too return json handles


app.use("/location", LocationRouter)
app.use("/bhk", BhkRouter)
app.use('/predict', PredictRouter)

app.listen(PORT, "127.0.0.1", () => {
    console.log("Listening to Port 8000")
})