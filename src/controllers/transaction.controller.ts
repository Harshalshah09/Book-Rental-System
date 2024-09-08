import { Request, Response } from 'express';
import { Transaction } from '../models/transaction.model';
import mongoose from 'mongoose';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';

// Issue a book
export const issueBook = async (req: Request, res: Response) => {
    try {
        const { bookId, userId, issueDate } = req.body;

        // Check if bookId and userId are valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid bookId or userId' });
        }

        // Check if book and user exist
        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!book || !user) {
            return res.status(404).json({ message: 'Book or User not found' });
        }

        // Create transaction
        const transaction = new Transaction({
            bookId,
            userId,
            issueDate: new Date(issueDate),
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: 'Server Error', error: err.message });
        }
        return res.status(500).json({ message: 'Unknown Server Error' });
    }
};

// Return a book
export const returnBook = async (req: Request, res: Response) => {
    try {
        const { transactionId, returnDate } = req.body;

        // Validate if transactionId is valid
        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return res.status(400).json({ message: 'Invalid transactionId' });
        }

        // Fetch transaction and populate book details
        const transaction = await Transaction.findById(transactionId).populate('bookId');
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Calculate rent
        const rent =
            (new Date(returnDate).getTime() - new Date(transaction.issueDate).getTime()) /
            (1000 * 60 * 60 * 24) * (transaction.bookId as any).rentPerDay;

        transaction.returnDate = new Date(returnDate);
        transaction.rent = rent;

        await transaction.save();
        res.json(transaction);
    } catch (err: unknown) {
        if (err instanceof Error) {
            return res.status(500).json({ message: 'Server Error', error: err.message });
        }
        return res.status(500).json({ message: 'Unknown Server Error' });
    }
};
// Get list of books issued by a user
export const getIssuedBooksByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const transactions = await Transaction.find({ userId, returnDate: { $exists: false } }).populate('bookId');
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
