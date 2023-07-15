const router = require("express").Router();
const { Jobs, Notes, JobsUsers } = require("../../models");
const { findOne } = require("../../models/User");

//end point api/job

//add new Job and Note
router.post("/post", async (req, res) => {
  try {
    const note_title = req.body.note_title;
    const note_body = req.body.note_body;
    const job_title = req.body.job_title;
    const status = req.body.status;
    const company_name = req.body.company_name;
    const saved_job_id = req.body.job_id;
    const user_id = req.session.user_id;

    //checking if job already exists in the DB first
    const checkJob = await Jobs.findOne({
      where: {
        saved_job_id: saved_job_id,
      },
    });
    console.log("check job:");
    console.log(checkJob);

    //if doesn't exist, saving job and notes
    if (checkJob === null) {
      const jobData = await Jobs.create({
        job_title,
        company_name,
        saved_job_id,
      });

      const newJobData = await Jobs.findOne({
        where: {
          saved_job_id: saved_job_id,
        },
      });
      console.log("new job:");
      console.log(newJobData);
      const job = newJobData.get({ plain: true });
      const job_id = job.id;

      const jobUserData = await JobsUsers.create({
        status,
        job_id,
        user_id,
      });

       if (note_title || note_body) {
         const notesData = await Notes.create({
           note_title,
           note_body,
           user_id,
           job_id,
         });
       }
       res.status(200).json(jobUserData);
       return;
    }

    //if job exists already, need to check if user have saved this job already
    const existingJob = checkJob.get({ plain: true });
    const existing_job_id = existingJob.id;

    const jobUserDataCheck = await JobsUsers.findOne({
      where: {
        job_id: existing_job_id,
        user_id: user_id,
      },
    });

    console.log("checkign if exists:");
    console.log(jobUserDataCheck);

    //if doesn't exist, creating
    if (jobUserDataCheck === null) {
      const jobUserData = await JobsUsers.create({
        status,
        job_id: existing_job_id,
        user_id,
      });
    }

    //if notes data was passed, save new note
    if (note_title || note_body) {
      const notesData = await Notes.create({
        note_title,
        note_body,
        user_id,
        job_id: existing_job_id,
      });
    }
    res.status(200).json(checkJob);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
