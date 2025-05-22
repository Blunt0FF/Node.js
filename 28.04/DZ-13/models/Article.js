import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});

export default mongoose.model('Article', articleSchema);