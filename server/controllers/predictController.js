const Predict = require("../services/predictService");



const findprice = async (req, res) => {

    try {

        const predictStatus = await Predict.find(req,res)
        console.log("OPredict", predictStatus)
        if (predictStatus?.success)
            res.status(200).json({ data: "okay", success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    findprice
};