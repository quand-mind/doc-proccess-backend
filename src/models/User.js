import { Sequelize, DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';


const User = sequelize.define(
  'SEUSUARIOS',
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
    xcontrasena: {
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
  }
  
);

const newUser = async(data) => {
  const newUser = User.build({ xemail: data.xemail, xcontrasena: data.xcontrasena, xnombre: data.xnombre, xapellido: data.xapellido, cusuariocreacion: data.cusuario, cusuariomodificacion: data.cusuario });
  console.log(`Usuario ${data.xnombre} ${data.xapellido} creado`);
  await newUser.save();
}
const syncUser = async() => {
  User.sync({ force: true })
}

const verifyIfUsernameExists = async (xemail) => {
  try {
    const user = await User.findOne({
      where: {
        xemail: xemail,
      },
      attributes:['cusuario', 'xemail', 'xnombre']
    });
    return user ? user.get({ plain: true }) : null;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message }
  }
}

const verifyIfPasswordMatchs = async (xemail, xcontrasena) => {
  try {
    const user = await User.findOne({
      where: {
        xemail: xemail,
        xcontrasena: xcontrasena
      },
      attributes:['cusuario']
    });
    return user ? user.get({ plain: true }) : null;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}

const getOneUser = async (xemail) => {
  try {
    const user = await User.findOne({
      where: {
        xemail: xemail,
      }
    });
    return user ? user.get({ plain: true }) : null;
  }
  catch (error) {
      console.log(error.message)
      return { error: error.message };
  }
}
const getUserModel = () => {
  return User
}

export default {
  syncUser,
  newUser,
  verifyIfUsernameExists,
  verifyIfPasswordMatchs,
  getOneUser,
  getUserModel
}