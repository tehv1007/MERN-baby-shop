const bcrypt = require("bcrypt");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Token = require("../models/Token");
const sendEmail = require("../services/sendEmail");

// Singup
exports.signup = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409) //Conflict
        .send({ message: "User with given email already Exist!" });

    user = await User.findOne({ username: req.body.username });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given username already Exist!" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    // Tạo cart cho user
    const cart = new Cart({
      userId: user._id,
      products: [],
      subPrice: 0,
    });
    await cart.save();

    const token = await new Token({
      userId: user._id,
      token: user.generateAuthToken(),
    }).save();

    const url = `${process.env.SERVER_URL_DEV}/auth/${user.id}/verify/${token.token}`;
    await sendEmail(
      user.email,
      "Verify Email",
      `       Thank you for using our shop!\n
      To get started shopping on our website, please verify your email address by clicking the below link!\n
      ${url}\n
      If you did not create an account, please ignore this email or contact support if you have questions.\n
      Thanks,\n`
    );

    res
      .status(201) // Created a new resource
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Verify email address for registration
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" }); // Bad request

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    user.verified = true;
    await user.save();
    await token.remove();

    // res.status(200).send({ message: "Email verified successfully" });
    res.status(200).redirect(`${process.env.CLIENT_URL_DEV}/verify`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Login
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        {
          email: req.body.emailUsername,
        },
        {
          username: req.body.emailUsername,
        },
      ],
    });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Username" }); //Unauthorized

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: user.generateAuthToken(),
        }).save();
        const url = `${process.env.SERVER_URL_DEV}/auth/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
      }

      // await token.remove();
      return res.status(400).send({
        message:
          "You haven't verified your email yet, so an email sent to your account. Please verify!",
      });
    }

    if (!user.isActive) {
      return res
        .status(403) //Forbidden
        .send({ message: "Your account has been disabled." });
    }

    const token = user.generateAuthToken();
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        user_token: token,
        user: others,
        message: "Logged in successfully",
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
