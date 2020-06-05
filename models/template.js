const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({ 
  name: {
    type: String,
  },
  versions: {
    type: Array,
  }
});

module.exports = mongoose.model('Template', templateSchema); 