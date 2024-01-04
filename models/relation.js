'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Relation.belongsTo(models.User, {foreignKey: 'male_user'})
      Relation.belongsTo(models.User, {foreignKey: 'female_user'})
    }
  }
  Relation.init({
    male_user: DataTypes.INTEGER,
    female_user: DataTypes.INTEGER,
    liked_by_m: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    liked_by_f: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dislike: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    match: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Relation',
  });
  return Relation;
};