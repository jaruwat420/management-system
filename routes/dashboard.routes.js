import { Router } from "express";

import {
    renderHome,
    getManagement,
    previewData
} from "../controllers/dashboardController.js";
import auth from "../middleware/auth.js"
const router = Router();



router.get("/", auth, renderHome);
router.get("/management", auth, getManagement)
router.post("/data_preview",auth, previewData)

export default router;