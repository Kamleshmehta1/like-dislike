import { Schema, model } from 'mongoose';

const recepieSchema = new Schema(
  {
    title: { type: String, required: true },
    ingredients: {
      type: [
        {
          item: { type: String, required: true },
        },
      ],
    },
    instructions: { type: String, required: true },
    likes: [{ type: Schema.ObjectId, ref: 'User' }],
    email: { type: String, required: true },
    recepieImg: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('recepies', recepieSchema);
