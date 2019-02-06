//TODO move to a new service with a different port

const express = require('express');
var jwt = require('jsonwebtoken');
const User = require('../models/user');
const config=require('../config/config');
const authorize = require('../middlewares/authorize');

//const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
const RSA_PRIVATE_KEY = config.jwt_secret;

const router = express.Router();
// { email, password }
router.post('/admin-login', (req, res) => {
  const email = req.body.email;
  const password=req.body.password;
  console.log(req.body);
  if (email=="a@b.com" && password=='123')
  {
    //console.log(req);
    let user={
    email:email,
    id:1234,
    isActive:false,
    isAdmin:true,
    phone:'0501234567'
    }
    
      const token = jwt.sign({sd:'asdfgh'}, RSA_PRIVATE_KEY, {
        //algorithm: 'RS256',
        expiresIn: 15*60,
        subject: user.id.toString()
    });
    console.log(token);
    res.status(200).send({ token,user});
  }
  else{//bad request
    res.status(400).send({ message: 'Invalid credintials' });
  }
});

module.exports = router;
