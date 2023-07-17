const router = require("express").Router();
const sequelize = require("sequelize");
const { Notes, Jobs, JobsUsers } = require("../models");
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
          model: Jobs,
        },
      ],
    });
    const jobs = jobsData.map((job) => job.get({ plain: true }));
    //console.log(jobs);

    // checking if link to the job is working
    for (const job of jobs) {
      let job_link = `https://findwork.dev/${job.job.saved_job_id}`;
      const answer = await fetch(job_link);
      //console.log(answer.status);

      if (answer.status === 404) {
        job.available = false;
        const statusData = await JobsUsers.update(
          { status: "Job no longer available" },
          {
            where: {
              user_id: userID,
              job_id: job.id,
            },
          }
        );
      } else {
        job.available = true;
      }
    }

    res.render("dashboard", { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET job details and notes
router.get("/job/:id", withAuth, async (req, res) => {
  try {
    const userID = req.session.user_id;
    const jobID = req.params.id;
    const jobsData = await Jobs.findByPk(jobID);
    const jobDetails = jobsData.get({ plain: true });
    console.log(jobDetails);

    const officialJobID = jobDetails.saved_job_id;

    console.log(officialJobID);

    const notesData = await Notes.findAll({
      where: {
        user_id: userID,
        job_id: jobID,
      },
    });

    const notes = notesData.map((note) => note.get({ plain: true }));

    const response = await fetch(
      `https://findwork.dev/api/jobs/${officialJobID}`,
      {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      }
    );
    const data = await response.json();

    res.render("jobandnotes", { data, notes, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//ADD new note
router.post("/note", async (req, res) => {
  try {
    const note_title = req.body.note_title;
    const note_body = req.body.note_body;
    const job_id = req.body.job_id;
    const user_id = req.session.user_id;

    //if notes data was passed, save new note
    if (note_title || note_body) {
      const notesData = await Notes.create({
        note_title,
        note_body,
        user_id,
        job_id,
      });
      res.status(200).json(notesData);
      return;
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE status for job
router.put("/job-status/:id", async (req, res) => {
  try {
    //need to pass new status and job id
    const status = req.body.status;
    const job_id = req.params.id;
    const user_id = req.session.user_id;

    const statusData = await JobsUsers.update(
      { status },
      {
        where: {
          user_id: user_id,
          job_id: job_id,
        },
      }
    );
    res.status(200).json(statusData);
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
        user_id: userID,
      },
    });

    //removing all related notes
    const notesData = await Notes.destroy({
      where: {
        job_id: jobID,
        user_id: userID,
      },
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

//DELETE saved note
router.delete("/note/:id", withAuth, async (req, res) => {
  try {
    const noteID = req.params.id;
    const notesData = await Notes.destroy({
      where: {
        id: noteID,
      },
    });

    res.status(200).json(notesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
