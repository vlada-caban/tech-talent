const router = require("express").Router();
const sequelize = require("sequelize");
require("dotenv").config();
const withAuth = require("../utils/auth");

// GET resource HTML
router.get("/", async (req, res) => {
    try {
      res.render("resources", { loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
