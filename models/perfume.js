'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Perfume.belongsTo(models.user, {
        foreignKey: 'userId',
        allowNull: false,
        as: 'user'
      });
    }
  }
  Perfume.init({
    first_layer: DataTypes.STRING,
    second_layer: DataTypes.STRING,
    third_layer: DataTypes.STRING,
    price: DataTypes.FLOAT,
    packaging: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perfume',
  });
  return Perfume;
};