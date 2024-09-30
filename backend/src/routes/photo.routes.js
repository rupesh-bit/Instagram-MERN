import { Router } from 'express';
import {
    getAllPhotos,
    publishAPhoto,
    getPhotoById,
    updatePhoto,
    deletePhoto,
    togglePublishStatus
} from "../controllers/photo.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllPhotos)
    .post(
        upload.single("photo"),
        publishAPhoto
    );

router
    .route("/:photoId")
    .get(getPhotoById)
    .delete(deletePhoto)
    .patch(upload.single("photo"), updatePhoto);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router