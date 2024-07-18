import express from "express"
import { authToken } from "../middlewares/Auth.js";
import { registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

// // All Routers 
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
