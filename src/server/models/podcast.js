const mongoose = require('mongoose');

const { Schema } = mongoose;

const podcastSchema = new Schema({
  createdOn: { type: Date, default: Date.now(), required: true },
  updatedOn: { type: Date },
  title: { type: String, required: true },
  subtitle: { type: String },
  website: { type: String },
  author: { type: String, required: true },
  keywords: [String],
  description: { type: String, required: true },
  isExplicit: { type: Boolean, default: true },
  isComplete: { type: Boolean, default: false },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'episode', required: true }],
  slug: { type: String, required: true },
});

module.exports = mongoose.model('podcast', podcastSchema);
