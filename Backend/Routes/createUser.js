const express = require('express');
const router = express.Router();
const User = require('../modules/User');
// we are taking take collection from the file
router.post('/createuser', async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email:req.body.email,
            password: req.body.password,
            location: req.body.location
        })
        //  and here we are creating a document inside the collection called user
        res.json({ success: true });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: 'Error creating user' });

    }
})

module.exports = router;
// now here we are exporting the router and mounting it with the index.js app file