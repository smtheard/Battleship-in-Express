var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('game', { player: req.query.player, game: req.query.game });
});

module.exports = router;