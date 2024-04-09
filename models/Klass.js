import mongoose, { Schema, ObjectId } from "mongoose";

const Klass = mongoose.model(
  "Klass",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.length > 4,
        message: `Class must be at least 4 characters`,
      },
    },
  })
);

export default Klass;
