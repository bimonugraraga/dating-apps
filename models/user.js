'use strict';
const {
  Model
} = require('sequelize');
const {gender} = require('../constants/gender')
const {hashPassword} = require('../utils/passHandler')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Relation, {foreignKey:'male_user'})
      User.hasMany(models.Relation, {foreignKey:'female_user'})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is Required"
        },
        notEmpty: {
          msg: "Email is Required"
        },
        isUnique: async (value) => {
          let target = await User.findOne({
            where: {
              email: value
            }
          })
          if (target){
            throw new Error('Email Has Been Taken');
          }
        },
        isEmail: {
          msg: "Invalid Email Format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Passoword is Required"
        },
        notEmpty: {
          msg: "Passoword is Required"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is Required"
        },
        notEmpty: {
          msg: "Name is Required"
        }
      }
    },
    age: DataTypes.INTEGER,
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [gender.female, gender.male]
      }
    },
    profile: DataTypes.TEXT,
    prefer: {
      type: DataTypes.STRING,
      validate: {
        isIn: [gender.female, gender.male]
      }
    },
    quota: {
      type: DataTypes.INTEGER,
      defaultValue: 10
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCreate: (value) => {
        value.password = hashPassword(value.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};