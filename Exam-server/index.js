const express = require('express');
const cors = require('cors');
const tests = require('./routes/tests');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/tests', tests);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ⚡`));
