import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Generic middleware to validate request data against a given schema
export const validateRequest = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};
