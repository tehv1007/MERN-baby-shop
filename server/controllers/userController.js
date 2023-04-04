const User = require("../models/User");
const bcrypt = require("bcrypt");

//GET ALL USER
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.isActive = !user.isActive;
  await user.save();

  res.send(user);
};

//DELETE user by ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phoneNumber, address, image } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Kiểm tra email
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Cập nhật thông tin người dùng
    user.name = name;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.image = image;
    if (email != user.email) user.email = email;

    await user.save();

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Kiểm tra xem mật khẩu hiện tại có chính xác hay không
  const passwordMatches = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatches) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  // Kiểm tra xem mật khẩu mới và xác nhận lại mật khẩu mới có giống nhau hay không
  if (newPassword !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password do not match" });
  }

  // Cập nhật mật khẩu mới cho người dùng
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();

  return res.status(200).json({ message: "Password changed successfully" });
};
