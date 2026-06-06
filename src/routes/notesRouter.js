import { Router } from 'express';

import { getAllNotes, getNoteById } from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.get('/', getAllNotes);
notesRouter.get('/:noteId', getNoteById);

export default notesRouter;
