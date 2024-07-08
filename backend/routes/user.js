import express from "express";
import { deleteProfile, followUser, forgotPassword, getAllUsers, getMyPosts, getUserPosts, getUserProfile, login, logout, myProfile, registerUser, resetPassword, updatePasword, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

var router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePasword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/my/posts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUsers);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

export default router;