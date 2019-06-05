var db = require('../models');

// Routes
// =============================================================
module.exports = {
  findAll: function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  },
  create: function(req, res) {
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  },
};
