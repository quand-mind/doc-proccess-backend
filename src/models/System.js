import { Sequelize, DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'

const UserM = User.getUserModel()


const System = sequelize.define(
  'MASISTEMAS',
  {
    // Model attributes are defined here
    csistema: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull:false
    },
    xnombre: {
      type: DataTypes.STRING(250),
    },
    bactivo: {
      type: DataTypes.BOOLEAN,
    },
    cusuario: {
      type: DataTypes.INTEGER,
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
  }
  
);

System.hasOne(UserM, {
  foreignKey: 'cusuario',
});
UserM.belongsTo(System, {
  foreignKey: 'cusuario',
});

const newSystem = async(data) => {
  const newSystem = System.build({ xnombre: data.xnombre, bactivo:true, cusuario: data.cusuarioencargado, cusuariocreacion: data.cusuario, cusuariomodificacion: data.cusuario });
  await newSystem.save();
  console.log(`Sistema ${data.xnombre} creado`);
}
const syncSystem = async() => {
  System.sync({ force: true })
}
const getSystems = async () => {
  try {
    const system = await System.findAll({
      where: {
        bactivo: true,
      }
    });
    const systems = system.map((item) => item.get({ plain: true }));
    return systems
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

const getSystemModel = () => {
  return System
}

export default {
  syncSystem,
  newSystem,
  getSystemModel,
  getSystems
}