import dns from 'dns';
// Примусово використовуємо публічні DNS для вирішення SRV записів Atlas
// Це фікс для помилки querySrv ECONNREFUSED на Windows [citation:7]
dns.setServers(['1.1.1.1', '8.8.8.8']);

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errors } from 'celebrate';

import 'dotenv/config';

import { logger } from './middleware/logger.js';

import authRouter from './routes/authRoutes.js';
import notesRouter from './routes/notesRouter.js';

import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());

app.use('/auth', authRouter);
app.use('/', notesRouter);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

const port = Number(process.env.PORT) || 3000;

app.listen(port, () =>
  console.log(`🎉 Server running successfully on ${port} port`),
);
