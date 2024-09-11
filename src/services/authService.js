import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const verifyIfUsernameExists = async (xemail) => {
    const verifiedUsername = await User.verifyIfUsernameExists(xemail);
    if (!verifiedUsername) {
        return { error: 'El email no esta registrado en el sistema.', code: 500 };
    }
    return verifiedUsername;
}

const verifyIfPasswordMatchs = async (xemail, xcontrasena) => {
    const verifiedPassword = await User.verifyIfPasswordMatchs(xemail, xcontrasena);
    if (!verifiedPassword) {
        return { error: 'Contraseña Incorrecta.', code: 500 };
    }
    return verifiedPassword;
};

const createJWT = (user) => {
    const payload = {
        cusuario: user.cusuario,
        xemail: user.xemail,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
    }
    return jwt.sign(payload, process.env.JWT_SECRET)
}

const checkToken = (token) => { 
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
}

const getOneUser = async (xemail) => {
    const user = await User.getOneUser(xemail);
    if (user.error) {
        return { error: user.error };
    }
    if (!user) {
        return { errorNotFound: "User not found" };
    }
    if (user.xemail) {
        user.xemail
    }
    return user;
}

export default {
    verifyIfUsernameExists,
    verifyIfPasswordMatchs,
    createJWT,
    getOneUser,
    checkToken
}