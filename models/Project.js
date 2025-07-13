const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or path to image
  name: { type: String, required: true },
  description: { type: String, required: true },
  
});

module.exports = mongoose.model('Project', projectSchema);