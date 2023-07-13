const { JobsUsers } = require("../models");

const jobsusersdata = [
  {
    status: "Applied",
    user_id: 1,
    job_id: 1,
  },
  {
    status: "Rejected",
    user_id: 2,
    job_id: 1,
  },
  {
    status: "Need to apply",
    user_id: 3,
    job_id: 1,
  },
  {
    status: "Applied",
    user_id: 2,
    job_id: 4,
  },
  {
    status: "Offer received",
    user_id: 2,
    job_id: 3,
  },
  {
    status: "Need to apply",
    user_id: 2,
    job_id: 2,
  },
];

const seedJobsUsers = () => JobsUsers.bulkCreate(jobsusersdata);

module.exports = seedJobsUsers;
