const { User } = require("../models");

const userData = [
  { //1
    username: "Vlada",
    email: "vlada@gmail.com",
    password: "password123",
  },
  { //2
    username: "Tom",
    email: "tom@gmail.com",
    password: "password345",
  },
  { //3
    username: "Jess",
    email: "jess@aol.com",
    password: "password456",
  },
];

const seedUser = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;
