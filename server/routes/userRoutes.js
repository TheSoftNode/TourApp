import express from "express";
import {
    forgotPassword,
    login,
    logout,
    refreshToken,
    resetPassword,
    signUp,
    updatePassword,
    verifyAccount,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/protectRoutes.js";
import restrictTo from "../middlewares/roleManager.js";
import {
    createUser,
    deleteMe,
    deleteUser,
    getAllUsers,
    getMe,
    getUser,
    reactivateAccount,
    resizeUserPhoto,
    updateMe,
    updateUser,
    updateUserRole,
    uploadUserPhoto,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify user email
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.route("/verify-email").post(verifyAccount);

/**
 * @swagger
 * /signup/{verify_token}:
 *   post:
 *     summary: User signup
 *     parameters:
 *       - name: verify_token
 *         in: path
 *         required: true
 *         description: Token for email verification
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.route("/signup/:verify_token").post(signUp);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     responses:
 *       200:
 *         description: Login successful
 */
router.route("/login").post(login);

/**
 * @swagger
 * /refresh-token:
 *   post:
 *     summary: Refresh user token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
router.route("/refresh-token").post(refreshToken);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Request password reset
 *     responses:
 *       200:
 *         description: Password reset link sent
 */
router.route("/forgot-password").post(forgotPassword);

/**
 * @swagger
 * /reset-password/{token}:
 *   patch:
 *     summary: Reset user password
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Token for password reset
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.route("/reset-password/:token").patch(resetPassword);

// Ensure that all the routes below are authenticated
router.use(isAuthenticated);

router.route("/logout").post(logout);
router.route("/update-password").patch(updatePassword);
router.get("/me", getMe, getUser);
router.patch("/update-me", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/delete-me", deleteMe);

// Restrict the endpoints below to admin access only
router.use(restrictTo("admin"));

router.route("/")
    .get(getAllUsers)
    .post(createUser);

router.route("/update-role/:id").patch(updateUserRole);
router.route("/re-activate-user").patch(reactivateAccount);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
