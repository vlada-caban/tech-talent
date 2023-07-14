const router = require("express").Router();
const sequelize = require("sequelize");
const { Notes, Users, Jobs, JobsUsers } = require("../models");
require("dotenv").config();
const withAuth = require("../utils/auth");

//api key for findwork.dev
const apiKey = process.env.API_KEY;

// /dashboard end point

// GET all jobs for dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const userID = req.session.user_id;
    const jobsData = await Jobs.findAll({
      where: {
        user_id: userID,
      },
      include: [
        {
          model: Users,
          through: JobsUsers,
          as: "user_saved_job",
        },
      ],
    });
    const jobs = jobsData.map((job) => job.get({ plain: true }));
    console.log(jobs);
    res.render("dashboard", { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
