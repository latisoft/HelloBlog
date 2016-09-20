var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:uid', function(req, res, next) {
  res.send('hello ' + req.params.uid);
});

module.exports = router;
