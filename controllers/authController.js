const User = require("../models/user");

// Render signup page
exports.getSignup = (req, res) => {
  res.render("signup", { error: null });
};

// Handle signup POST
exports.postSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already exists" });
    }
    await User.create({ fullName, email, password });
    res.redirect("/auth/signin");
  } catch (err) {
    console.error(err);
    res.render("signup", { error: "Signup failed" });
  }
};

// Render signin page
exports.getSignin = (req, res) => {
  res.render("signin", { error: null });
};

// Handle signin POST
exports.postSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("signin", { error: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.render("signin", { error: "Invalid email or password" });

    // Save user session
    req.session.userId = user._id;
    req.session.userName = user.fullName;

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("signin", { error: "Signin failed" });
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/auth/signin");
};