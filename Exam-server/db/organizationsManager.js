const baseRepository = require('./managerBase');

function getOrganizations(adminEmail, callback) {
  baseRepository.executeInDB(
    'sp_GetOrganizations',
    [{ managerId: adminEmail }],
    callback
  );
}

module.exports = {
  getOrganizations: getOrganizations
};
