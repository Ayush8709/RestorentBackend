// Get user Data from DataBase
import express from 'express'
import {getUserController, updateUserController} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// routes
// Get USER 
    router.get('/getUser',authMiddleware,getUserController)

  //Update User
  router.put('/updateUser',authMiddleware,updateUserController)  
export default router