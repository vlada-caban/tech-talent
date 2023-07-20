const router = require("express").Router();
const sequelize = require("sequelize");
const { Notes, User, JobsUsers, Jobs } = require("../models");
require("dotenv").config();
const withAuth = require("../utils/auth");

//api key for findwork.dev
const apiKey = process.env.API_KEY;

// GET all job posts for homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/newpassword", async (req, res) => {
  try {
    res.render("newpassword", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all job posts for homepage
router.get("/jobs", async (req, res) => {
  try {
    const response = await fetch("https://findwork.dev/api/jobs/", {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    });
    const data = await response.json();

    //console.log(data);

    res.render("alljobs", {
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
    const user_id = req.session.user_id;
    let notSaved = true;

    const response = await fetch(`https://findwork.dev/api/jobs/${job_id}`, {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    });
    const data = await response.json();

    const jobsData = await Jobs.findOne({
      where: {
        saved_job_id: job_id,
      },
    });

    //console.log(jobsData);

    if (jobsData !== null) {
      const jobsSavedData = await JobsUsers.findOne({
        where: {
          job_id: jobsData.id,
          user_id: user_id,
        },
      });

      if (jobsSavedData !== null) {
        notSaved = false;
      }
    }
    console.log(data);

    res.render("joblisting", {
      data,
      loggedIn: req.session.loggedIn,
      notSaved,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all jobs with for homepage with filters
router.get(
  "/jobs/filter/:employType/:remoteStatus",
  withAuth,
  async (req, res) => {
    try {
      const employmentType_id = req.params.employType;
      const remoteStatus = req.params.remoteStatus;
      console.log(employmentType_id);
      console.log(remoteStatus);

      const response = await fetch(
        `https://findwork.dev/api/jobs/?employment_type=${employmentType_id}&remote=${remoteStatus}`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${apiKey}`,
          },
        }
      );
      const data = await response.json();

      // console.log(data);

      res.render("alljobs", { data, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// GET all jobs with for homepage with search applied
router.get("/jobs/search/:searchQuery", withAuth, async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    console.log(searchQuery);

    const response = await fetch(
      `https://findwork.dev/api/jobs/?search=${searchQuery}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      }
    );
    const data = await response.json();

    // console.log(data);

    res.render("alljobs", { data, loggedIn: req.session.loggedIn });
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
