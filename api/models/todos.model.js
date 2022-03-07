const { DataTypes } = require('sequelize');

const { db } = require('../util/database');

const Todos = db.define(
  'todos',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'active'
    }
  },
  {
    timestamps: false
  }
);

module.exports = { Todos };
