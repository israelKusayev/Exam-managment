const baseRepository = require('./managerBase');

function createTestInputs(test) {
  // let arr = [];
  // let i = 0;
  // for (const key in test) {
  //   arr[i++] = { inputName: key, value: test[key] };
  // }
  // return arr;

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
                { successEmailTemplateId: successEmailTemplateId },
                { failureEmailTemplateId: failureEmailTemplateId }
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
            { testId: testId },
            { questionsId: baseRepository.createListId(questions) }
          ],
          callback
        );
      }
    );
  }
}

exports.createTest = createTest;
