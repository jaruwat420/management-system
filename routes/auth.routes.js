import { Router } from "express";
import {
    renderRegister,
    getRegister,
    renderLogin,
    getLogin
} from "../controllers/authController.js";
const router = Router();

router.get("/register", renderRegister);
router.put('/register', getRegister);
router.get("/login", renderLogin);
router.put("/login", getLogin);

export default router;