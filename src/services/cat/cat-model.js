'use strict';

// cat-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true }
});

const catSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  breed: { type: String, required: true },
  photo: { type: String, required: true },
  age: { type: String, required: true },
  likedBy: [ userSchema ],
  authorId: { type: Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const catModel = mongoose.model('cat', catSchema);

module.exports = catModel;
