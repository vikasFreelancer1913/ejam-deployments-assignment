const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({ 
  url: {
    type: String
  },
  name: {
    type: String
  },
  version: {
    type: String
  },
  deployedAt: {
    type: String,
  }
});

module.exports = mongoose.model('Deployment', deploymentSchema); 