var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var name = req.body.name;
  res.render('gameLobby', { title: 'Battleship', name: name });
});

module.exports = router;