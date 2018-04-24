const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const podcastSchema = new Schema({
  createdOn: { type: Date, default: Date.now(), required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  website: { type: String },
  author: {
    type: String,
    required: true,
    default: function() {
      return this.title;
    },
  },
  description: {
    type: String,
    required: true,
    default: 'A pretty good podcast',
  },
  isExplicit: { type: Boolean, default: true },
  isComplete: { type: Boolean, default: false },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'episode', required: true }],
  slug: { type: String, unique: true, required: true },
});

podcastSchema.plugin(uniqueValidator);

module.exports = mongoose.model('podcast', podcastSchema);
