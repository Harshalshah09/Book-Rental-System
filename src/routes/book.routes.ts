import express from 'express';
import { createBook, getBooksByName, getBooksByRentRange } from '../controllers/book.controller';
import { bookValidationSchema } from '../validations/book.validation';
import { validateRequest } from '../middlewares/validateRequest.middleware';

const router = express.Router();

// Create a new book
router.post('/books', validateRequest(bookValidationSchema), createBook);

// Get books by name or search term
router.get('/books/name/:name', getBooksByName);

// Get books by rent range
router.get('/books/rent-range', getBooksByRentRange);

export default router;
