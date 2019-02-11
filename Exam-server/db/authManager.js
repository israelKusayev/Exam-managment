const baseRepository = require('./managerBase');
const sql = require('mssql');

exports.getAdminByEmail=function(email, callback) {
  baseRepository.executeInDB('sp_GetManagerByEmail', [{Email:email}], callback);
}

exports.activateAdminByEmail=function(email, callback) {
   baseRepository.executeInDB('sp_ActivateManagerByEmail', [{Email:email}], callback);
}

exports.adminRegister=function(email,passwordHash,name, callback) {
  baseRepository.executeInDB('sp_ManagerRegister', [{Email:email},{PasswordHash:passwordHash},{Name:name}], callback);
}

exports.adminResetPassword=function(email,passwordHash, callback) {
  baseRepository.executeInDB('sp_ManagerResetPassword', [{Email:email},{PasswordHash:passwordHash}], callback);
}


exports.studentSignup=function(email,firstName,lastName,phone, callback) {
  baseRepository.executeInDB('sp_StudentSignup', [{Email:email},{FirstName:firstName},
    {LastName:lastName},{Phone:phone}], callback);
}

exports.studentExists=function(email, callback) {
  baseRepository.executeInDB('sp_StudentExists', [{Email:email}], callback);
}

exports.getStudentByEmail=function(email, callback) {
  baseRepository.executeInDB('sp_getStudentByEmail', [{Email:email}], callback);
}
