const express = require('express');
const reportsManager = require('../db/reportsManager');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.get('/test-executions-report', authorize.admin, (req, res) => {
  let { subjectId, testId, fromDate, toDate } = req.query;
  if (!fromDate) fromDate = null;
  if (!toDate) toDate = null;
  console.log({ subjectId, testId, fromDate, toDate });
  reportsManager.getTestExecutionsReportHeader(
    subjectId,
    testId,
    fromDate,
    toDate,
    headerData => {
      if (headerData && !headerData.error) {
        reportsManager.getTestExecutionsByDateRange(
          subjectId,
          testId,
          fromDate,
          toDate,
          testExecutionsData => {
            if (testExecutionsData && !testExecutionsData.error) {
              res.status(200).send({
                header: headerData[0],
                testExecutions: testExecutionsData
              });
            } else {
              res.status(500).end();
            }
          }
        );
      } else {
        res.status(500).end();
      }
    }
  );
});

router.get('/test-executions-results', authorize.admin, (req, res) => {
  let { subjectId, testId, fromDate, toDate } = req.query;
  if (!fromDate) fromDate = null;
  if (!toDate) toDate = null;
  reportsManager.getTestExecutionsResults(
    subjectId,
    testId,
    fromDate,
    toDate,
    data => {
      if (data && !data.error) {
        res.status(200).send(data);
      } else {
        res.status(500).end();
      }
    }
  );
});

router.get('/test-executions-questions-stats', authorize.admin, (req, res) => {
  let { subjectId, testId, fromDate, toDate } = req.query;
  if (!fromDate) fromDate = null;
  if (!toDate) toDate = null;
  reportsManager.getTestExecutionsQuestionsStats(
    subjectId,
    testId,
    fromDate,
    toDate,
    data => {
      if (data && !data.error) {
        res.status(200).send(data);
      } else {
        res.status(500).end();
      }
    }
  );
});

module.exports = router;
