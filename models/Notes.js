const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notes extends Model {}

Notes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    note_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "notes",
  }
);

module.exports = Notes;
