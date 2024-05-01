const express = require("express");
const adminController = require("../controller/AdminController.js");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");

/**
 * GET /admin
 * Admin - Login Page
 */
router.get("/", adminController.index);

/**
 * POST /admin
 * Admin - Check login
 */
router.post("/", adminController.login);

/**
 * POST /admin/register
 * Admin - Register user
 */
router.post("/register", adminController.register);

/**
 * GET /admin/dashboard
 * Admin Dashboard
 */
router.get("/dashboard", authMiddleware, adminController.dashboard);

/**
 * GET /admin/add-post
 * Admin - Create new post
 */
router.get("/add-post", authMiddleware, adminController.create);

/**
 * POST /admin/add-post
 * Admin - store the post
 */
router.post("/add-post", authMiddleware, adminController.store);

/**
 * GET /admin/edit-post
 * Admin - Edit the post
 */
router.get("/edit-post/:id", authMiddleware, adminController.edit);

/**
 * PUT /admin/edit-post
 * Admin - Edit the post
 */
router.put("/edit-post/:id", authMiddleware, adminController.update);


/**
 * DELETE /admin/delete-post
 * Admin - Delete the post
 */
router.delete("/delete-post/:id", authMiddleware, adminController.delete);

/**
 * POST /admin/logout
 * Admin - Logout the user
 */
router.post("/logout", authMiddleware, adminController.logout);

module.exports = router;
