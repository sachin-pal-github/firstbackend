import { Router } from "express"; // Corrected import statement
import { upload } from "../middlewares/multer.middleware.js"; // Corrected path
import { loginUser, logoutUser, registerUser ,refreshAccessToken} from "../controllers/user.controller.js";
import { varifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([{name:"avatar",maxCount:1},{name:"coverImage",maxCount:1}]),
    registerUser
);
router.route("/login").post(loginUser)

//secure routes
router.route("/logout").post(varifyJWT,  logoutUser)  //another middlewarwe for next() here
router.route("refresh-token").post(refreshAccessToken)
export default router;
 