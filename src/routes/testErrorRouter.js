import { Router } from 'express';

const testErrorRouter = Router();

testErrorRouter.get('/', () => {
  throw new Error('Simulated server error');
});

export default testErrorRouter;
