var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('friend', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category: {
      type: Sequelize.STRING
    },
    invited: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
}
