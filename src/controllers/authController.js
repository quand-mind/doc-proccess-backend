import authService from './../services/authService.js';

const createJWT = async (req, res) => {
    const xemail = req.body.xemail;
    const verifiedUsername = await authService.verifyIfUsernameExists(xemail);
    if (verifiedUsername.error) { 
        res
            .status(verifiedUsername.code)
            .send({ 
                status: false,
                message: verifiedUsername.error
            });
        return;
    }
    const xcontrasena = req.body.xcontrasena;
    const verifiedPassword = await authService.verifyIfPasswordMatchs(xemail, xcontrasena);
    if (verifiedPassword.error) { 
        res
            .status(verifiedPassword.code)
            .send({ 
                status: false,
                message: verifiedPassword.error
            });
        return;
    }
    const user = await authService.getOneUser(xemail);
    if (user.error) {
        return res
            .status(user.code)
            .send({
                status: false,
                message: user.error
            });
    }
    const jwt = authService.createJWT(user);
    res
        .status(201).send({ 
            status: true, 
            message: 'Usuario Autenticado',
            data: {
                cusuario: user.cusuario,
                xemail: user.xemail,
                token: 'Bearer ' + jwt
            }
        });
    return;
};

const checkToken = async (req, res) => {
    // console.log(req.body.token)
    const token = req.body.token.split('Bearer ')
    const checkToken = authService.checkToken(token[1])
}

const getUserModules = async (req, res) => {
    const userModules = await authService.getUserModules(req.body.cusuario);
    if (userModules.error) {
        return res
            .status(userModules.code)
            .send({
                status: false,
                message: userModules.error
            });
    }
    return res
        .status(200)
        .send({
            status: true,
            data: {
                groups: userModules
            }
        })
}

export default {
    createJWT,
    getUserModules,
    checkToken,
}