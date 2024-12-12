const express = require('express');
const router = express.Router();

router.post('/food-data', async (req, res) => {
    try {
        res.send({
            food_items: global.food_items,
            food_category: global.food_category
        });
    } catch (err) {

    }
});

module.exports = router;