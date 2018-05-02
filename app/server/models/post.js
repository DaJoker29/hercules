const mongoose = require('mongoose');
const shortid = require('shortid');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const postSchema = new Schema({
  postID: {
    type: String,
    required: true,
    default: shortid.generate,
    unique: true
  },
  created: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  excerpt: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema);
