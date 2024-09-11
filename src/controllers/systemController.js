import authService from './../services/authService.js';
import System from './../models/System.js'

const getSystems = async (req, res) => {
    const systems = await System.getSystems();
    if (systems.error) { 
        res
        .status(systems.code)
        .send({ 
            status: false,
            message: systems.error
        });
        return;
    }
    res.send({
      status: true,
      data: systems
    });
};


export default {
    getSystems,
}