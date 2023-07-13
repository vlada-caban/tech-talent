const User = require("./User");
const Notes = require("./Notes");
const Jobs = require("./Jobs");
const JobsUsers = require("./JobsUsers");

User.hasMany(Notes, {
  foreignKey: "user_id",
});

Notes.belongsTo(User, {
  foreignKey: "user_id",
});

Jobs.hasMany(Notes, {
  foreignKey: "job_id",
});

Notes.belongsTo(Jobs, {
  foreignKey: "job_id",
});

Jobs.belongsToMany(User, {
  through: {
    model: JobsUsers,
    unique: false
  },
  as: "job_belongs_to_user",
});

User.belongsToMany(Jobs, {
  through: {
    model: JobsUsers,
    unique: false,
  },
  as: "user_saved_job",
});

module.exports = { User, Notes, Jobs, JobsUsers};
