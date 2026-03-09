import { Router } from 'express';
import { getInvoiceById } from '../controllers/invoiceController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:id', authenticate, getInvoiceById);

export default router;
