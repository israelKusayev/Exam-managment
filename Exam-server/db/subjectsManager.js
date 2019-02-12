const baseRepository = require('./managerBase');

function getSubjects(organizationId, callback) {
  baseRepository.executeInDB(
    'sp_GetSubject',
    [{ organizationId: organizationId }],
    callback
  );
}

module.exports = {
  getSubjects: getSubjects
};
