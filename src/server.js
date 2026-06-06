import dns from 'dns';
// Примусово використовуємо публічні DNS для вирішення SRV записів Atlas
// Це фікс для помилки querySrv ECONNREFUSED на Windows [citation:7]
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import 'dotenv/config';

import logger from './middlewares/logger.js';

import notesRouter from './routes/notesRouter.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHanlder from './middlewares/errorHandler.js';

import connectMongoDB from './db/connectMongoDB.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());

app.use('/notes', notesRouter);

app.use(notFoundHandler);
app.use(errorHanlder);

await connectMongoDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () =>
  console.log(`🎉 Server running successfully ${port} port`),
);
