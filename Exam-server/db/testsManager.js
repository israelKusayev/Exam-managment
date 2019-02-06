const baseRepository = require('./managerBase');
const sql = require('mssql');

function createTestInputs(test) {
  return [
    {
      inputName: 'language',
      type: sql.Int,
      value: test.language
    },
    {
      inputName: 'testName',
      type: sql.NVarChar,
      value: test.testName
    },
    {
      inputName: 'passingGrade',
      type: sql.TinyInt,
      value: test.passingGrade
    },
    {
      inputName: 'showAnswres',
      type: sql.Bit,
      value: test.showAnswres
    },
    {
      inputName: 'header',
      type: sql.NVarChar,
      value: test.header
    },
    {
      inputName: 'successMessage',
      type: sql.NVarChar,
      value: test.successMessage
    },
    {
      inputName: 'failureMessage',
      type: sql.NVarChar,
      value: test.failureMessage
    },
    {
      inputName: 'certificate',
      type: sql.NVarChar,
      value: test.certificate
    },
    {
      inputName: 'sendCompletionMessage',
      type: sql.Bit,
      value: test.sendCompletionMessage
    },
    {
      inputName: 'formEmail',
      type: sql.NVarChar,
      value: test.formEmail
    },

    {
      inputName: 'SubjectId',
      type: sql.Int,
      value: 2
    },
    {
      inputName: 'CreatorEmail',
      type: sql.NVarChar,
      value: 'moshe@gmail.com'
    }
  ];
}

function passingEmailTemplateInputs(test) {
  return [
    {
      inputName: 'Subject',
      type: sql.NVarChar,
      value: test.passingMessageSubject
    },
    {
      inputName: 'Body',
      type: sql.NVarChar,
      value: test.passingMessageBody
    }
  ];
}

function failingEmailTemplateInputs(test) {
  return [
    {
      inputName: 'Subject',
      type: sql.NVarChar,
      value: test.failingMessageSubject
    },
    {
      inputName: 'Body',
      type: sql.NVarChar,
      value: test.failingMessageBody
    }
  ];
}

function createTest(test, callback) {
  if (test.sendCompletionMessage) {
    baseRepository.executeInDB(
      'sp_CreateEmailTemplate',
      passingEmailTemplateInputs(test),
      data => {
        const successEmailTemplateId = data[0].id;

        baseRepository.executeInDB(
          'sp_CreateEmailTemplate',
          failingEmailTemplateInputs(test),
          data => {
            const failureEmailTemplateId = data[0].id;

            baseRepository.executeInDB(
              'sp_CreateTest',
              [
                ...createTestInputs(test),
                {
                  inputName: 'successEmailTemplateId',
                  type: sql.Int,
                  value: successEmailTemplateId
                },
                {
                  inputName: 'failureEmailTemplateId',
                  type: sql.Int,
                  value: failureEmailTemplateId
                }
              ],
              data => {
                console.log(data);

                callback({ success: true });
              }
            );
          }
        );
      }
    );
  } else {
    baseRepository.executeInDB(
      'sp_CreateTest',
      createTestInputs(test),

      data => {
        console.log(data);

        callback({ success: true });
      }
    );
  }
}

exports.createTest = createTest;
