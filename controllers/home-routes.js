const router = require("express").Router();
const sequelize = require("sequelize");
const { Notes, User } = require("../models");
require("dotenv").config();
const withAuth = require("../utils/auth");

//api key for findwork.dev
const apiKey = process.env.API_KEY;

// GET all job posts for homepage
router.get("/", async (req, res) => {
    try {
      const response = await fetch("https://findwork.dev/api/jobs/", {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      });
      const data = await response.json();

      //console.log(data);

      res.render("homepage", {
        data,
        loggedIn: req.session.loggedIn,
      });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// GET one job
router.get("/job/:id", withAuth, async (req, res) => {
    try {
      const job_id = req.params.id;
  
      const response = await fetch(`https://findwork.dev/api/jobs/${job_id}`, {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      });
      const data = await response.json();
      
      //console.log(data);

      res.render("joblisting", { data, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
