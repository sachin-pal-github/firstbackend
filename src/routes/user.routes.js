import { Router } from "express"; // Corrected import statement
import { upload } from "../middlewares/multer.middleware.js"; // Corrected path
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
    upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]),
    registerUser
);

export default router;
