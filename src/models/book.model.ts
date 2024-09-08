import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
    bookName: string;
    category: string;
    rentPerDay: number;
}

const bookSchema: Schema = new Schema({
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true },
});

export const Book = mongoose.model<Book>("Book", bookSchema);