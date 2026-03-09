import { Router } from 'express';
import { summary } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/summary', authenticate, summary);

export default router;
