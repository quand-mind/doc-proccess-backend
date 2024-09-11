
import express from 'express';

import systemController from '../../src/controllers/systemController.js';

const router = express.Router();

router

    .get("/get", systemController.getSystems)

export default router;