var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        valability: {
            type: Sequelize.DATEONLY
        },
        isAvailable: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
}
