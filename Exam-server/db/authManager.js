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
