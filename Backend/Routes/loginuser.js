const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
// this thing is called express validator 
// we are taking take collection from the file
router.post('/login-user',[
 
//  checks whether the name is at least 3 characters long
 body('email').isLength({min:5}),
 body('password','Your password is too short').isLength({min:8})
//  checks whether the password is at least 8 characters longs
],
     async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // this gives an error if the above conditions don't match or break 
    try {
        let email = req.body.email;
        let userData = await User.findOne({email});
        if(!userData){
            return res.status(400).json({errors:'Your email is invalid'});
        }
        if(req.body.password !== userData.password){
            return res.status(400).json({errors:'Your password is incorrect'});
        }
        //  and here we are creating a document inside the collection called user
        res.json({ success: true });
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: 'Error creating user' });

    }
})

module.exports = router;
// now here we are exporting it to the index.js file