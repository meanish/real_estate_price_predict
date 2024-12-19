const Predict = require("../services/predictService");



const findprice = async (req, res) => {

    try {

        const predictStatus = Predict.find(req)
        res.status(200).json({ data: predictStatus, success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {
    findprice
};