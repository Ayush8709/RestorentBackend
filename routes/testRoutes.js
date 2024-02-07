import express from 'express'
import testControllers from '../controllers/testControllers.js';
const router = express.Router()

router.get('/test-user',testControllers)

export default router;