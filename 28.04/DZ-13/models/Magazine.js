import mongoose from 'mongoose';

const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issueNumber: Number,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Publisher' },
});

export default mongoose.model('Magazine', magazineSchema);