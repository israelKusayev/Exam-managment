const express = require('express');
const cors = require('cors');

const tests = require('./routes/tests');
const language = require('./routes/languages');
const questions = require('./routes/questions');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use('/api/tests', tests);
app.use('/api/language', language);
app.use('/api/questions', questions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ⚡`));
