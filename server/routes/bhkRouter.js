const express = require('express');
const app = express();
const router = express.Router();


const bhk =
{
    '0': '1 bhk',
    '1': '2 bhk',
    '2': '3 bhk'
}




router.get("/", (req, res) => {
    try {
        res.status(200).json({ data: bhk, success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

module.exports = router;