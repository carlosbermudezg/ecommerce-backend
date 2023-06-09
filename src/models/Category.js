const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // Desactivar los timestamps
});

module.exports = Category;
