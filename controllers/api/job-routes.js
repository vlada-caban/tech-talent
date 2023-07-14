const router = require("express").Router();
const { Jobs, Notes, JobsUsers } = require("../../models");

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

    const job = newJobData.get({ plain: true });
    const job_id = job.id;

    const jobUserData = await JobsUsers.create({
      status,
      job_id,
      user_id,
    });

    const notesData = await Notes.create({
      note_title,
      note_body,
      user_id,
      job_id
    });

    res.status(200).json(notesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
