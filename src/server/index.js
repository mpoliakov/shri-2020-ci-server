const path = require('path');
const express = require('express');
const swaggerUI = require('swagger-ui-express');

const app = express();

// const cors = require('cors');
// app.use(cors({credentials: true, origin: 'http://localhost:1337'}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../..', 'public')));
app.use(require('./routes'));
app.use('/api', swaggerUI.serve, swaggerUI.setup(require('./swagger')));

app.listen(5000);