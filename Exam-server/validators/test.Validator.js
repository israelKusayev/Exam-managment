const joi = require('joi');

const schema = {
  testName: joi.string().required(),
  language: joi.number().required(),
  showAnswres: joi.boolean().required(),
  header: joi.string().required(),
  passingGrade: joi.number().required(),
  successMessage: joi.string().required(),
  failureMessage: joi.string().required(),
  certificate: joi.string().required(),
  sendCompletionMessage: joi.boolean().required()
};
function validateCreateTest(test) {
  return joi.validate(test, schema, { allowUnknown: true });
}

module.exports = {
  validateCreateTest
};
