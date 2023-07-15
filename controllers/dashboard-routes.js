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
    const jobsData = await JobsUsers.findAll({
      where: {
        user_id: userID,
      },
      include: [
        {
          model: Jobs
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

//DELETE saved job
router.delete("/job/:id", withAuth, async (req, res) => {
    try {
        const userID = req.session.user_id;
        const jobID = req.params.id;
        //removing from JobsUsers
        const jobsUsersData = await JobsUsers.destroy({
            where: {
                job_id: jobID,
                user_id: userID
            }
        });

        //removing all related notes
        const notesData = await Notes.destroy({
            where: {
                job_id: jobID, 
                user_id: userID
            }
        });

        //checking if only this user saved this job and if so, removing it
        const jobsData = await JobsUsers.findAll({
          where: {
            job_id: jobID,
          },
        });

        console.log(jobsData);

        if (jobsData === []) {
            const jobToRemove = await Jobs.destroy({
              where: {
                id: jobID,
              },
            });
        }

        res.status(200).json(jobsUsersData);
        
    } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
