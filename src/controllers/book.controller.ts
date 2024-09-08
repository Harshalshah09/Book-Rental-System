import { Request, Response } from 'express';
import { Book } from '../models/book.model';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get books by name or search term
export const getBooksByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const books = await Book.find({ bookName: { $regex: name, $options: 'i' } });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get books within a rent range
export const getBooksByRentRange = async (req: Request, res: Response) => {
    try {
        const { minRent, maxRent } = req.query;
        const books = await Book.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
