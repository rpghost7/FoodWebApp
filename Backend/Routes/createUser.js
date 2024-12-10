const express = require('express');
const router = express.Router();
const User = require('../modules/User');
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
            password: req.body.password,
            location: req.body.location
        })
        res.json({ success: true, naming:req.body.name });
    }
        //  and here we are creating a document inside the collection called user
        
    } catch (err) {
        console.log(err);

        res.status(500).json({ errors:[{msg: 'Error creating user'}]  });

    }
})

module.exports = router;
// now here we are exporting the router and mounting it with the index.js app file