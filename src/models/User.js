import { Sequelize, DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    cusuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    xemail: {
      type: DataTypes.STRING(250),
    },
    xnombre: {
      type: DataTypes.STRING(250),
    },
    xapellido: {
      type: DataTypes.STRING(250),
    },
    cusuariocreacion: {
      type: DataTypes.INTEGER,
    },
    cusuariomodificacion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: 'fcreacion',
      // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'fmodificacion',
  },
  {
    tableName: 'SEUSUARIOS',
  },
);

const newUser = async(data) => {
  const newUser = User.build({ xemail: data.xemail, xnombre: data.xnombre, xapellido: data.xapellido });
}

const getUser = async(id) => {

}

export default {
  newUser,
  getUser
}