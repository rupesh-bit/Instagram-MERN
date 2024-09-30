import { Router } from 'express';
import {
    getChannelStats,
    getChannelPhotos,
} from "../controllers/dashboard.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").get(getChannelStats);
router.route("/photos").get(getChannelPhotos);

export default router