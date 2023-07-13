const sequelize = require('../config/connection');
const seedUser = require("./userData");
const seedJobs = require("./jobsData");
const seedNotes = require("./notesData");
const seedJobsUsers = require("./jobsusersData");


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedJobs();

  await seedNotes();

  await seedJobsUsers();

  process.exit(0);
};

seedDatabase();
