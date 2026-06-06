import { Router } from 'express';

const testErrorRouter = Router();

testErrorRouter.get('/test-error', () => {
  throw new Error('Simulated server error');
});

export default testErrorRouter;
