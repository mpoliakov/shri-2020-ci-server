import path from 'path';
import express from 'express';
import router from './routes/index';
// import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../..', 'dist')));
app.use(router);
// app.use('/api', swaggerUI.serve, swaggerUI.setup(require('./swagger')));

app.listen(5000);
