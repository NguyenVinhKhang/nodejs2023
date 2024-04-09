import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail";

const Student = mongoose.model(
  "Student",
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length > 3,
          message: `Name must be at least 3 characters`,
        },
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: (value) => isEmail,
          message: `Email is incorrect format`,
        },
      },
      languages: {
        type: [String],
      },
      gender: {
        type: String,
        enum: {
          values: [`Males`, `Female`],
          message: `{VALUE} is not support`,
        },
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: (value) => value.length > 5,
          message: `Phone must be at least 5 digits`,
        },
      },
      address: {
        type: String,
        required: false,
      },
    },
    {
      autoCreate: false,
      autoIndex: true,
    }
  )
);

export default Student;
