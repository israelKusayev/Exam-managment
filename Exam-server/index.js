const express = require('express');
const cors = require('cors');
const tests = require('./routes/tests');
const questions = require('./routes/questions');
const auth = require('./routes/auth');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/tests', tests);
app.use('/api/questions', questions);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ⚡`));
