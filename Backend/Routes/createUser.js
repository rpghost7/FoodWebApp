const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const bcrypt = require ('bcrypt');

// importing the bcrypt module
const { body, validationResult } = require('express-validator');
// this thing is called express validator 
// we are taking take collection from the file

router.post('/createuser',[
 body('name').isLength({ min: 3 }),
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
        const salt = await bcrypt.genSalt(10);
        // this is to generate salt which is technically the gibberish part in
        // the encyrption and makes it more secure
        let secPass = await bcrypt.hash(req.body.password,salt);
        // this combines using hash the password and the salt to make it totally secure
    try {
        let email= req.body.email;
        let userData = await User.findOne({email});
        if (userData) {
            return res.status(400).json({ errors: [{ msg: 'You are already a user please log in' }] });
        }
       else{
        await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secPass,
            location: req.body.location
        })
        res.json({ success: true, naming:req.body.name,email:req.body.email });
    }
        //  and here we are creating a document inside the collection called user
        
    } catch (err) {
        console.log(err);

        res.status(500).json({ errors:[{msg: 'Error creating user'}]  });

    }
})

module.exports = router;
// now here we are exporting the router and mounting it with the index.js app file

// one sec