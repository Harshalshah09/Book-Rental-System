import express from 'express';
import { issueBook, returnBook, getIssuedBooksByUser } from '../controllers/transaction.controller';
import { transactionIssueValidationSchema, transactionReturnValidationSchema } from '../validations/transaction.validation';
import { validateRequest } from '../middlewares/validateRequest.middleware';

const router = express.Router();

// Issue a book
router.post('/transactions/issue', validateRequest(transactionIssueValidationSchema), issueBook);

// Return a book
router.post('/transactions/return', validateRequest(transactionReturnValidationSchema), returnBook);

// Get list of books issued by a user
router.get('/transactions/user/:userId', getIssuedBooksByUser);

export default router;
