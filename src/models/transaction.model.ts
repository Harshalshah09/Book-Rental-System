import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    bookId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    issueDate: Date;
    returnDate?: Date;
    rent?: number;
}

const TransactionSchema: Schema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: { type: Date },
    rent: { type: Number }
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
