const mongoose = require('mongoose');
const moment = require('moment');

const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
  }
}, {
  toJSON: {
    getters: true
  }
});

module.exports = ReactionSchema;
