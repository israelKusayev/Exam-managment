const baseRepository = require('./managerBase');


function createTestInputs(test) {
  return [
    { language: test.language },
    { testName: test.testName },
    { passingGrade: test.passingGrade },
    { showAnswres: test.showAnswres },
    { header: test.header },
    { successMessage: test.successMessage },
    { failureMessage: test.failureMessage },
    { certificate: test.certificate },
    { sendCompletionMessage: test.sendCompletionMessage },
    { formEmail: test.formEmail },
    { subjectId: test.subjectId },
    { creatorEmail: test.creatorEmail }
  ];

}

function passingEmailTemplateInputs(test) {
  return [
    { Subject: test.passingMessageSubject },
    { Body: test.passingMessageBody }
  ];
}

function failingEmailTemplateInputs(test) {
  return [
    { Subject: test.failingMessageSubject },
    { Body: test.failingMessageBody }
  ];
}

function createTest(data, callback) {
  const { details: test, questions } = data;
  if (test.sendCompletionMessage) {
    baseRepository.executeMultipleSp(
      [
        {
          name: 'sp_CreateEmailTemplate',
          inputs: passingEmailTemplateInputs(test),
          returnValue: {
            valueName: 'successEmailTemplateId',
            spNumber: 2,
            returnValueName: 'id'
          }
        },
        {
          name: 'sp_CreateEmailTemplate',
          inputs: failingEmailTemplateInputs(test),
          returnValue: {
            valueName: 'failureEmailTemplateId',
            spNumber: 2,
            returnValueName: 'id'
          }
        },
        {
          name: 'sp_CreateTest',
          inputs: createTestInputs(test),
          returnValue: {
            valueName: 'testId',
            spNumber: 3,
            returnValueName: 'id'
          }
        },
        {
          name: 'sp_AddQuestionsToTest',
          inputs: [{ questionsId: baseRepository.createListId(questions) }]
        }
      ],
      callback
    );
    // baseRepository.executeInDB(
    //   'sp_CreateEmailTemplate',
    //   passingEmailTemplateInputs(test),
    //   data => {
    //     const successEmailTemplateId = data[0].id;

    //     baseRepository.executeInDB(
    //       'sp_CreateEmailTemplate',
    //       failingEmailTemplateInputs(test),
    //       data => {
    //         const failureEmailTemplateId = data[0].id;

    //         baseRepository.executeInDB(
    //           'sp_CreateTest',
    //           [
    //             ...createTestInputs(test),
    //             { successEmailTemplateId: successEmailTemplateId },
    //             { failureEmailTemplateId: failureEmailTemplateId }
    //           ],
    //           callback
    //         );
    //       }
    //     );
    //   }
    // );
  } else {
    baseRepository.executeMultipleSp(
      [
        {
          name: 'sp_CreateTest',
          inputs: createTestInputs(test),
          returnValue: {
            valueName: 'testId',
            spNumber: 1,
            returnValueName: 'id'
          }
        },
        {
          name: 'sp_AddQuestionsToTest',
          inputs: [{ questionsId: baseRepository.createListId(questions) }]
        }
      ],
      callback
    );
    // baseRepository.executeInDB(
    //   'sp_CreateTest',
    //   createTestInputs(test),
    //   data => {
    //     const testId = data[0].id;
    //     baseRepository.executeInDB(
    //       'sp_AddQuestionsToTest',
    //       [
    //         { testId: testId },
    //         { questionsId: baseRepository.createListId(questions) }
    //       ],
    //       callback
    //     );
    //   }
    // );
  }
}

function getTest(id, callback) {
  baseRepository.executeInDB('sp_GetTest', [{ id: id }], callback);
}

module.exports = {
  createTest: createTest,
  getTest: getTest
};
