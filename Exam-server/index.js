const express = require('express');
const cors = require('cors');

const language = require('./routes/languages');
const certificates = require('./routes/certificates');
const tests = require('./routes/tests');
const questions = require('./routes/questions');
const answers = require('./routes/answers');
const auth = require('./routes/auth');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use('/api/language', language);
app.use('/api/certificates', certificates);
app.use('/api/tests', tests);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ⚡`));
