const express = require ('express'); 
const router = express.Router(); 
const Deployment = require('../models/deployment'); 
const Template = require('../models/template'); 

//Fetch all templates
router.get('/templates', function(req, res) { 
  Template.find(function(err, templates) {
    res.json(templates);
  });
});

router.get('/deployments', function(req, res) { 
  Deployment.find(function(err, deployments) {
    res.json(deployments);
  });
});


router.post('/deployments', function(req, res) {     
  let deployment = new Deployment(req.body);
  deployment.save()
    .then(deployment => {
      res.send(deployment);
    })
    .catch(function(err) {
      res.status(422).send('Deployment add failed');
    });
});

router.delete('/deployments/:id', function(req, res) {  
  Deployment.findById(req.params.id, function(err, deployment) {
    if (!deployment) {
      res.status(404).send('Deployment not found');
    } else {
      Deployment.findByIdAndRemove(req.params.id)
        .then(function() { res.status(200).json("Deployment deleted") })
        .catch(function(err) {
          res.status(400).send("Deployment delete failed.");
        })
    }
  });
})

module.exports = router;   