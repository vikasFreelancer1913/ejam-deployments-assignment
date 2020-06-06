const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({ 
  url: {
    type: String,
    required: [true, "URL is required"]
  },
  name: {
    type: String,
    required: [true, "Template name is required"]
  },
  version: {
    type: String,
    required: [true, "Version is required"]
  },
  deployedAt: {
    type: String,
  }
});

module.exports = mongoose.model('Deployment', deploymentSchema); 