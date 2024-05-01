const express = require("express");
const homeController = require('../controller/HomeController.js');
const router = express.Router();

/**
 * GET /
 * HOME
 */
router.get("", homeController.index);

/**
 * GET /posts/
 * Post :id
 */
router.get("/posts/:id", homeController.post);

/**
 * POST /search
 * Post :search-term
 */
router.post('/search', homeController.search);

router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: '/about'
  });
});

module.exports = router;
