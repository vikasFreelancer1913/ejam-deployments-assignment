const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
// const cors = require('cors');
const router = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.LOCAL_HOST || '0.0.0.0';
const MONGODB_URI = process.env.PROD_MONGODB || "mongodb+srv://testingUser:abcd@1234@deployments-s9emb.mongodb.net/Deployment?retryWrites=true&w=majority";
// app.use(cors())
app.use(bodyParser.json())
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'client/build')));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', function() {
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});
app.listen(PORT, HOST, function() {
  console.log(`Server listening on port ${PORT}.`);
});
