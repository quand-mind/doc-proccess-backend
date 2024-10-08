import express from 'express';

import authController from '../../src/controllers/authController.js';

const router = express.Router();

router

    .post("/login", authController.createJWT)
    .post("/user-modules", authController.getUserModules)
    .post("/checkToken", authController.checkToken)

export default router;