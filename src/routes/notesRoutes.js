import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  createNoteSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

const notesRouter = Router();

notesRouter.use('/notes', authenticate);

notesRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
notesRouter.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
notesRouter.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);
notesRouter.patch(
  '/notes/:noteId',
  celebrate(noteIdSchema),
  celebrate(updateNoteSchema, { abortEarly: false }),
  updateNote,
);
notesRouter.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

export default notesRouter;
