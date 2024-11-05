import express from "express"
const router = express.Router();
import { getLikes, getUserProfileAndRepos, likeProfile } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
router.get("/profile/:username" , getUserProfileAndRepos)
router.get("/likes" , ensureAuthenticated , getLikes)
router.post("/likes/:username" , ensureAuthenticated , likeProfile)
export default router 