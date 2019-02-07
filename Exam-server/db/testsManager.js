const baseRepository = require('./managerBase');
const sql = require('mssql');

function createTestInputs(test) {
  return [
    {
      inputName: 'language',
      value: test.language
    },
    {
      inputName: 'testName',
      value: test.testName
    },
    {
      inputName: 'passingGrade',
      value: test.passingGrade
    },
    {
      inputName: 'showAnswres',
      value: test.showAnswres
    },
    {
      inputName: 'header',
      value: test.header
    },
    {
      inputName: 'successMessage',
      value: test.successMessage
    },
    {
      inputName: 'failureMessage',
      value: test.failureMessage
    },
    {
      inputName: 'certificate',
      value: test.certificate
    },
    {
      inputName: 'sendCompletionMessage',
      value: test.sendCompletionMessage
    },
    {
      inputName: 'formEmail',
      value: test.formEmail
    },

    {
      inputName: 'SubjectId',
      value: 2
    },
    {
      inputName: 'CreatorEmail',
      value: 'moshe@gmail.com'
    }
  ];
}

function passingEmailTemplateInputs(test) {
  return [
    {
      inputName: 'Subject',
      value: test.passingMessageSubject
    },
    {
      inputName: 'Body',
      value: test.passingMessageBody
    }
  ];
}

function failingEmailTemplateInputs(test) {
  return [
    {
      inputName: 'Subject',
      value: test.failingMessageSubject
    },
    {
      inputName: 'Body',
      value: test.failingMessageBody
    }
  ];
}

function createTest(data, callback) {
  console.log(data);

  const { details: test, questions } = data;

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
                  value: successEmailTemplateId
                },
                {
                  inputName: 'failureEmailTemplateId',
                  value: failureEmailTemplateId
                }
              ],
              callback
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
        const testId = data[0].id;
        baseRepository.executeInDB(
          'sp_AddQuestionsToTest',
          [
            {
              inputName: 'testId',
              value: testId
            },
            {
              inputName: 'questionsId',
              value: baseRepository.createListId(questions)
            }
          ],
          callback
        );
      }
    );
  }
}

exports.createTest = createTest;
