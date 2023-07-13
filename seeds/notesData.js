const { Notes } = require("../models");

const notesdata = [
  {
    note_title: "Need to apply",
    note_body: "Need to rework resume to include requirements",
    user_id: 1,
    job_id: 1,
  },
  {
    note_title: "Waiting for response",
    note_body: "Need to check linked in if I know anyone",
    user_id: 1,
    job_id: 2,
  },
  {
    note_title: "Rejected",
    note_body: "Received rejection from Tom, but said they will keep me in mind fo rhte future",
    user_id: 2,
    job_id: 1,
  },
  {
    note_title: "Offer received",
    note_body: "Received an offer, but salary too low",
    user_id: 2,
    job_id: 3,
  },
  {
    note_title: "Need to research",
    note_body: "Need to do further research on this company",
    user_id: 3,
    job_id: 4,
  },
  {
    note_title: "Still waiting",
    note_body: "Reached out to Same on LinkedIn for help",
    user_id: 1,
    job_id: 2,
  },
];

const seedNotes = () => Notes.bulkCreate(notesdata);

module.exports = seedNotes;
