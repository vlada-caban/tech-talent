const { Jobs } = require("../models");

const jobsdata = [
  {//1
    job_title: "Director of Engineering",
    company_name: "Builder Prime",
    saved_job_id: "Xq2KxJn",
  },
  {//2
    job_title: "AI Training for Marketing Experts",
    company_name: "Remotasks",
    saved_job_id: "Qeq3EYQ",
  },
  {//3
    job_title: "Account Executive",
    company_name: "Paces",
    saved_job_id: "XE5YojX",
  },
  {//4
    job_title: "Senior Demand Generation Analyst (hybrid)",
    company_name: "Rutter",
    saved_job_id: "Q4qYNLM",
  },
];

const seedJobs = () => Jobs.bulkCreate(jobsdata);

module.exports = seedJobs;

