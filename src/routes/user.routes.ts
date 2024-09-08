import express from 'express';
import { createUser, updateUser, getAllUsers } from '../controllers/user.controller';
import { userValidationSchema } from '../validations/user.validation';
import { validateRequest } from '../middlewares/validateRequest.middleware';

const router = express.Router();

// Route to create a new user with validation middleware
router.post('/users', validateRequest(userValidationSchema), createUser);

// Route to update a user with validation middleware
router.put('/users/:id', validateRequest(userValidationSchema), updateUser);

// Route to get all users (no validation needed)
router.get('/users', getAllUsers);

export default router;
