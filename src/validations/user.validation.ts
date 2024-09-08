import Joi from 'joi';

export const userValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).max(100).required(),
    address: Joi.string().min(5).required()
});
