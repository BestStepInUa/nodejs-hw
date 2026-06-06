import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import 'dotenv/config';

import logger from './middlewares/logger.js';

import notesRouter from './routes/notesRouter.js';
import testErrorRouter from './routes/testErrorRouter.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHanlder from './middlewares/errorHandler.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());

app.use('/notes', notesRouter);
app.use('/test-error', testErrorRouter);

app.use(notFoundHandler);
app.use(errorHanlder);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running successfully ${port} port`));
