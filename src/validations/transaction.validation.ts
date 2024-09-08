import Joi from 'joi';
import mongoose from 'mongoose';
// Custom validation to check if the ID is a valid MongoDB ObjectId
const objectIdValidator = (value: string, helpers: Joi.CustomHelpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message({ custom: `"${value}" is not a valid ObjectId` });
    }
    return value; // valid ObjectId
};

// Joi validation schema for issuing and returning a book
export const transactionIssueValidationSchema = Joi.object({
    bookId: Joi.string().required(),
    userId: Joi.string().required(),
    issueDate: Joi.date().required()
});


export const transactionReturnValidationSchema = Joi.object({
    transactionId: Joi.string().custom(objectIdValidator).required(),
    returnDate: Joi.date().required(),
});