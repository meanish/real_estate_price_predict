const express = require('express');
const app = express();
const router = express.Router();


const loc_data = require("../../model/columns.json")
const loc = { ...loc_data['data-columns'] }



router.get("/", (req, res) => {
    try {
        res.status(200).json({ data: loc, success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error });
    }
});

module.exports = router;