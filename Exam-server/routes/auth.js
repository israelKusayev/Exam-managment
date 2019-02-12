//TODO move to a new service with a different port

const express = require('express');
var jwt = require('jsonwebtoken');
const config=require('../config/config');
const bcrypt=require('bcryptjs');
const authManager=require('../db/authManager');
const mailer=require('../helpers/mailer');

const router = express.Router();


router.post('/student-login', (req, res) => {
  const email = req.body.email;
  if (email)
  {
    authManager.getStudentByEmail(email,(data) => {
      console.log(email);
      console.log(data);
      if (!data || data.error) {
        res.status(500).end();
      }
      else if (data && data[0]){
          const dbUser=data[0];
          const user = {
            email: dbUser.Email,
            name: null,
            firstName:  dbUser.FirstName,
            lastName:  dbUser.LastName,
            isActive: true,
            isAdmin: false,
            phone:  dbUser.Phone
          }
          console.log(user);
          res.status(200).send({user});
        }else{
          res.status(400).send({ message: 'Incorrect email' });
        }
        
      });
  }
  else
    res.status(400).send({ message: 'Email or password is not provided' });
  
});

router.post('/student-signup', (req, res) => {
  const user = req.body.user;
  if (user)
  {
    authManager.studentExists(user.email,(data)=>{
      if (data && data[0].Result==0){
        authManager.studentSignup(user.email,user.firstName,user.lastName,user.phone,(data) => {
          if (data && data[0].Success){
              const ret = {
                email: user.Email,
                name: null,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: true,
                isAdmin: false,
                phone: user.phone
              }
              res.status(200).send({user: ret});
          }
          else{
            res.status(500).end();
          }
        });
      }else{
        res.status(400).send({message: 'User already exists'});
      }
    });
    
  }
  else
    res.status(400).send({ message: 'No input provided' });
  
});

router.post('/admin-login', (req, res) => {
  const email = req.body.email;
  const password=req.body.password;
  if (email && password)
  {
    authManager.getAdminByEmail(email,(data) => {
      if (!data || data.error) {
        res.status(500).end();
      }
      else{
        if ( data && data[0] && bcrypt.compareSync(password,data[0].PasswordHash)){
          const dbUser=data[0];
          const user = {
            email: dbUser.Email,
            name: dbUser.Name,
            firstName: null,
            lastName: null,
            isActive: dbUser.IsActive,
            isAdmin: true,
            phone: null
          }
          if (!user.isActive){
            mailer.sendAdminUserActivationLink(user.email,req);
          }
          const token = jwt.sign({}, config.jwt_secret, {
            //algorithm: 'RS256',
            expiresIn: config.adminTokenExpiresIn,
            subject: user.email.toString()
          });
          res.status(200).send({ token,user});
        }else{
          res.status(400).send({ message: 'Incorrect email or password' });
        }
        
      }
    });
  }
  else
    res.status(400).send({ message: 'Email or password is not provided' });
  
});

router.get('/activate-admin-account',(req,res)=>{
  const rawToken = req.query.token;

  const activationHTML=function(title,message){
      return '<!doctype html><html><head><title>'+
      title+
      '</title></head><body><div style="width:500px;"><h1>Exams System</h1><hr/><h4>'+
      message+
      '</h4></div></body></html>';
  };

  try{
    const decodedToken = jwt.verify(rawToken,config.adminUserActivationSecret);
    // const expirationDate = helper.getTokenExpirationDate(data.token);
    //const isExpired = jwtHelper.isTokenExpired(data.token);
      const email=decodedToken.sub;
      authManager.activateAdminByEmail(email,(data)=>{
          if (data && data[0].Success){
            if (data[0].RowsCount!=0){
            res.status(200).send(activationHTML('Exams system - Activation Success',
            'Your admin account has been activated successfully!'));
            }
            else{
              res.status(200).send(activationHTML('Exams system - Activation Success',
            'Your admin account has already been activated.'));
            }
          }
          else{
            res.status(400).send(activationHTML('Exams system - Activation Error',
            'An error occured, please try again later or log in through the system again.'));
          }
      });
    
  }
  catch (error){
    if (error instanceof jwt.TokenExpiredError){
      res.status(400).send(activationHTML('Exams system - Activation Error',
      'Link is expired, please sign in through the system again for a new link.'));
    }else{
      res.status(400).send(activationHTML('Exams system - Activation Error',
      'An error occured, please try again later or log in through the system again.'));
    }
  }
    

});

router.post('/admin-register',(req,res)=>{
  const email = req.body.email;
  const password=req.body.password;
  const name=req.body.name;
  
  if (!(email && password))
    res.status(400).send({message: 'One of the required fields is missing'});
  else {
    authManager.getAdminByEmail(email,(data) =>{
      if (!data||data.Error) 
        res.status(500).end();
      else if (data && data[0]){
        res.status(400).send({ message: 'Email already exists'});
      }
      else{
        const passwordHash=bcrypt.hashSync(password,config.passwordhashSalt);
        authManager.adminRegister(email,passwordHash,name,(data)=>{
          if (data && data.error) {
            res.status(500).end();
          }
          
          mailer.sendAdminUserActivationLink(email,req);
          res.status(200).send();
        });
      }
    });
  }
});

router.post('/admin-getemail-by-resetpassword-token',(req,res)=>{
  const rawToken = req.body.token;
  
  if (!rawToken)
    res.status(400).send({message: 'No token provided'});
  else {
    try{
      const decodedToken = jwt.verify(rawToken,config.adminUserResetPasswordSecret);
      res.status(200).send({email: decodedToken.sub});
    }
    catch (error){
        res.status(401).send('Invalid token');
    }
  }
});

router.post('/admin-send-resetpassword-link',(req,res)=>{
  const email=req.body.email;
  
  if (!email)
    res.status(400).send({message: 'No email provided'});
  else {
      //for security reasons, dont send links to emails that do not exit in the database,
      //and send a success message anyway
      
      authManager.getAdminByEmail(email,(data)=>{
        if (data && data[0])
          mailer.sendResetPasswordLink(email);
        res.status(200).send();
      });
    }
});

router.post('/admin-reset-password',(req,res)=>{
  const rawToken = req.body.token;
  const password=req.body.password;
  if (!(rawToken && password))
    res.status(400).send({message: 'No token or no password provided'});
  else {
    try{
      const decodedToken = jwt.verify(rawToken,config.adminUserResetPasswordSecret);
      const email = decodedToken.sub;
      const passwordHash=bcrypt.hashSync(password,config.passwordhashSalt);
      authManager.getAdminByEmail(email,(data) =>{
        if (!data||data.Error) 
          res.status(500).end();
        else if (data && data[0]){
          authManager.adminResetPassword(email,passwordHash,(data)=>{
            if (data && data.error) {
              
              res.status(500).end();
            }else{
              res.status(200).send();
            }
          });
        }
        else{
           //Do not tell client that the email does not exist
           res.status(200).send();
        }
      });
    }
    catch (error){
        res.status(401).send('Invalid token');
    }
  }
});

router.post('/admin-refresh-token',(req,res)=>{
  const oldRawToken = req.body.token;
  if (!oldRawToken)
    res.status(400).send({message: 'No token provided'});
  else {
    try{
      const oldDecodedToken = jwt.verify(oldRawToken,config.adminUserResetPasswordSecret);
      const email = oldDecodedToken.sub;

      const newToken = jwt.sign({}, config.jwt_secret, {
        //algorithm: 'RS256',
        expiresIn: config.adminTokenExpiresIn,
        subject: email.toString()
      });
      res.status(200).send({newToken});
    }
    catch (error){
        res.status(401).send('Invalid token');
    }
  }
});


router.post('/admin-is-token-valid',(req,res)=>{
  const rawToken = req.body.token;
  if (!rawToken)
    res.status(200).send(false);
  else {
    try{
      const decodedToken = jwt.verify(rawToken,config.jwt_secret);
      res.status(200).send(true);
    }
    catch (error){
        res.status(200).send(false);
    }
  }
});



module.exports = router;
