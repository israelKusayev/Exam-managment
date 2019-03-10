const baseRepository = require('./managerBase');

exports.getTestExecutionsByDateRange = function(
  subjectId,
  testId,
  fromDate,
  toDate,
  callback
) {
  baseRepository.executeInDB(
    'sp_GetTestExecutionsByDateRange',
    [
      { SubjectId: subjectId },
      { TestId: testId },
      { FromDate: fromDate },
      { ToDate: toDate }
    ],
    callback
  );
};

exports.getTestExecutionsReportHeader = function(
  subjectId,
  testId,
  fromDate,
  toDate,
  callback
) {
  baseRepository.executeInDB(
    'sp_GetTestExecutionsReportHeader',
    [
      { SubjectId: subjectId },
      { TestId: testId },
      { FromDate: fromDate },
      { ToDate: toDate }
    ],
    callback
  );
};

exports.getTestExecutionsResults = function(
  subjectId,
  testId,
  fromDate,
  toDate,
  callback
) {
  baseRepository.executeInDB(
    'sp_GetTestExecutionsResults',
    [
      { SubjectId: subjectId },
      { TestId: testId },
      { FromDate: fromDate },
      { ToDate: toDate }
    ],
    callback
  );
};

exports.getTestExecutionsQuestionsStats = function(
  subjectId,
  testId,
  fromDate,
  toDate,
  callback
) {
  baseRepository.executeInDB(
    'sp_GetTestExecutionsQuestionsStats',
    [
      { SubjectId: subjectId },
      { TestId: testId },
      { FromDate: fromDate },
      { ToDate: toDate }
    ],
    callback
  );
};
