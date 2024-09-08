import Joi from 'joi';

export const bookValidationSchema = Joi.object({
    bookName: Joi.string().min(3).max(100).required(),
    category: Joi.string().required(),
    rentPerDay: Joi.number().positive().required(),
});
