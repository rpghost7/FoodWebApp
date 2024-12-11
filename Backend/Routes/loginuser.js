const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret= 'Thisismysecrettoken'
const { body, validationResult } = require('express-validator');
// this thing is called express validator 
// we are taking take collection from the file
router.post('/login-user',[
 
//  checks whether the name is at least 3 characters long
 body('email','Email is too short').isLength({min:5}),
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
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: 'Your email is invalid' }] });
        }
        const passCompare = bcrypt.compare(req.body.password,userData.password);
        //  the above function is used to compare both the password given by the user and the password in our database of the user (note this can only be used while logging in)
        if (!passCompare) {
            return res.status(400).json({ errors: [{ msg: 'Your password is incorrect' }] });
            // here i am making it consistent with the express validator so that it gives the correct alert messages
        }
        //  and here we are creating a document inside the collection called user
        const data = {
            user:{
                id:userData.id
            }
        }
        const token = jwt.sign(data,jwtSecret);
        res.json({ success: true, naming: userData.name, authToken:token });
        
    } catch (err) {
        console.log(err);

        res.status(500).json({ message: 'Error creating user' });

    }
})

module.exports = router;
// now here we are exporting it to the index.js file
