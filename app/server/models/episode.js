const mongoose = require('mongoose');

const { Schema } = mongoose;

const episodeSchema = new Schema({
  publishedOn: { type: Date, default: Date.now, required: true },
  title: { type: String, required: true },
  podcast: { type: Schema.Types.ObjectId, ref: 'podcast' },
  episodeNumber: { type: Number, required: true },
  description: { type: String, required: true, default: 'Yadda yadda yadda' },
});

module.exports = mongoose.model('episode', episodeSchema);
