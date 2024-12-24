const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const bcrypt = require ('bcrypt');

const twilio = require('twilio');

const accountSid = 'AC0b23435f390820c8a01279c0961c8309'
const authentToken = 'a270696270a395ed6287226dc8bdc82a'  // Replace with your Twilio Auth Token

const client = twilio(accountSid, authentToken);


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
       
       
        await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secPass,
            location: req.body.location
        })
        res.json({ success: true, naming:req.body.name,email:req.body.email });
    
        //  and here we are creating a document inside the collection called user
        
    } catch (err) {
        console.log(err);

        res.status(500).json({ errors:[{msg: 'Error creating user'}]  });

    }
})
router.post("/emailcheck", async (req, res) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const userData = await User.findOne({ email });

        if (userData) {
            return res.status(400).json({ success: false, message: "You are already a user. Please log in." });
        }

        return res.status(200).json({ success: true, message: "Email is available for registration." });
    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

// API route to send a verification code
router.post("/send-verification", async (req, res) => {
    const  phoneNumber  = req.body.phoneNumber;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    try {
        const verification = await client.verify.v2
            .services("VA2ea054056e8a7629ad3479e7ba12e278")
            .verifications.create({ to: '+917738301351', channel: "sms" })
            console.log("Verification SID:", verification.sid); // Log verification SID

        res.status(200).json({ success: true, sid: verification.sid });
    } catch (error) {
        console.error("Error sending verification:", error);
        res.status(500).json({ success: false, message: "Failed to send verification code" });
    }
});

router.post('/verify-otp', async (req, res) => {
    const otp = req.body.otp;
  
    try {
      const verificationCheck = await client.verify.v2
        .services("VA2ea054056e8a7629ad3479e7ba12e278") // Replace with your Verify Service SID
        .verificationChecks.create({ to:'+917738301351', code: otp });
  
      if (verificationCheck.status === 'approved') {
        res.json({ success: true, message: 'OTP verified successfully!' });
      } else {
        res.json({ success: false, message: 'Invalid OTP.' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  });
module.exports = router;
// now here we are exporting the router and mounting it with the index.js app file

// one sec