const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Jobs extends Model {}

Jobs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    saved_job_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "jobs",
  }
);

module.exports = Jobs;
