import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    age: number;
    address: string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, unique: true
    },
    age: { type: Number, required: true },
    address: { type: String, required: true },

});

export const User = mongoose.model<User>('Users', UserSchema);