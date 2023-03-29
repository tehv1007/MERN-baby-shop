const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUserById,
  changePassword,
  updateProfile,
  checkEmailDuplicate,
} = require("../controllers/userController");

//GET USER by ID
router.get("/find/:id", getUserById);

//UPDATE user by ID
router.put("/:id", updateUser);

//DELETE user by ID
router.delete("/:id", deleteUser);

// UPDATE password
router.put("/:id/password", changePassword);

// UPDATE profile
router.put("/:id/profile", checkEmailDuplicate, updateProfile);

module.exports = router;
