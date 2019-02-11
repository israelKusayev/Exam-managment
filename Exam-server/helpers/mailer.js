"use strict";
const nodemailer = require("nodemailer");
const config=require('../config/config');
const smtpTransport=require('nodemailer-smtp-transport');
const jwt = require('jsonwebtoken');


function sendAdminUserActivationLink(email,req){
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'noreply.examssystem@gmail.com',
      pass: 'norepexamssys!'
    }
  }));
  
// setup email data with unicode symbols

const token = jwt.sign({}, config.adminUserActivationSecret, {
  //algorithm: 'RS256',
  expiresIn: config.adminUserActivationExpiresIn,
  subject: email
});

const activationLink=req.protocol + '://' + req.get('host') + '/api/auth/'+config.activateAdminAccountActionName+'?token='+token;
let mailOptions = {
  from: `${config.mailerUser}`, // sender address
  to: email,
  subject: "Your Admin User Activation Link", // Subject line
  html: "<h3>You have an admin account that is not activated yet,<br/>"+
  "In order to activate it, please click the following link:</h3><br/>"+
  `<a href=${activationLink}>${activationLink}</a><br/>` +
  "<small>*Note: this link will expire in about 3 hours, for a new link, please log in again.</small>" // plain text body
};

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}


function sendResetPasswordLink(email){
  console.log('sendResetPasswordLink called');
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'noreply.examssystem@gmail.com',
      pass: 'norepexamssys!'
    }
  }));
    
  
  const token = jwt.sign({}, config.adminUserResetPasswordSecret, {
    //algorithm: 'RS256',
    expiresIn: config.adminUserResetPasswordExpiresIn,
    subject: email
  });

  const activationLink=config.clientUrl+'/'+config.adminResetPasswordClientActionName+'/'+token;
  let mailOptions = {
    from: `${config.mailerUser}`, // sender address
    to: email,
    subject: "Exams System - Your Password Reset Link", // Subject line
    html: "<h3>You made a request to reset your password,<br/>"+
    "In order to reset it, please click the following link:</h3><br/>"+
    `<a href=${activationLink}>${activationLink}</a><br/>` +
    "<small>*Note: this link will expire in 10 minutes ONLY, for a new link please make a password reset request again.</small>" // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
 

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}



module.exports.sendAdminUserActivationLink=sendAdminUserActivationLink;
module.exports.sendResetPasswordLink=sendResetPasswordLink;