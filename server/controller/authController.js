const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');


exports.signin = async (req, res) => {
     const { username, email, password } = req.body;
     if (!username || !email || !password) return res.status(200).json({ success: false, message: "All fields are required" });
     let pre = await userModel.findOne({ email });
     let google = pre?.isGoogle;

     if (google) return res.status(200).json({ success: false, message: "Email already used by google Login, try to login with google" });
     if (pre && !google) return res.status(200).json({ success: false, message: "Email already used. try to login" });

     try {
          let pass = await bcrypt.hash(password, 7);
          let user = await userModel.create({
               username, email, password: pass
          });

          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
          res.cookie("ticket", token, {
               httpOnly: true,
               secure: process.env.ENV == 'DEV' ? false: true,
               sameSite: process.env.ENV == 'DEV' ? "lax" : "none" ,
               maxAge: 30 * 24 * 60 * 60 * 1000
          });
          res.status(201).json({ success: true, message: "User Created", user });
     } catch (e) {
          res.status(200).json({
               success: false,
               message: e.message
          });
     }
}


exports.login = async (req, res) => {
     const { email, password } = req.query;
     console.log(email, passport);

     let user = await userModel.findOne({ email });
     let google = user?.isGoogle;

     if (!user) return res.status(200).json({ success: false, message: "User Not Found" });
     if (google && user) return res.status(200).json({ success: false, message: "Email already used by google Login, try to login with google" });

     try {
          let compare = await bcrypt.compare(password, user.password);
          if (!compare) return res.status(200).json({ success: false, message: "Incorrect Password" });

          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
          res.cookie('ticket', token, {
               secure: process.env.ENV === 'DEV' ? false: true,
               httpOnly: true,
               sameSite: process.env.ENV == 'DEV' ? "lax" : "none" ,
               maxAge: 30 * 24 * 60 * 60 * 1000
          });

          res.status(200).json({
               success: true,
               message: "Logged In Successfully",
               user
          })

     } catch (e) {
          res.status(200).json({
               success: false,
               message: e.message
          });
     }
}


exports.logout = async (req, res) => {
     try {
          res.clearCookie('ticket');
          res.status(200).json({ success: true, message: "logged Out Successfully", user: {} });
     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
}

exports.googleAuth = passport.authenticate("google", {
     session: false,
     scope: ["profile", "email"],
     failureRedirect: '/redirect'
});


exports.googleSignup = async (req, res) => {
     console.log("bug", req);

     try {
          let token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
          res.cookie('ticket', token, {
               secure: process.env.ENV === 'DEV' ? false: true,
               httpOnly: true,
               sameSite: process.env.ENV == 'DEV' ? "lax" : "none" ,
               maxAge: 30 * 24 * 60 * 60 * 1000
          });
          // console.log(token);
          res.redirect(`${process.env.FRONTEND_URI}/dashboard/home`);
     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
}

exports.getToken = async (req, res) => {
     const ticket = req.cookies.ticket;
     console.log(ticket)
     if (!ticket) return res.status(200).json({ success: false, message: "Login required" });

     try {
          let data = jwt.verify(ticket, process.env.JWT_SECRET);
          if (data.userId) {
               const user = await userModel.findById(data.userId);
               res.status(200).json({ success: true, message: "verified successfully", user })
          }
     } catch (error) {
          res.status(200).json({ success: false, message: error.message });
     }
}

exports.failureRedirect = async (req, res) => {
     res.redirect(`${process.env.FRONTEND_URI}/auth/login`);
}

exports.changePassword = async (req, res) => {
     const { password, confirmPassword, userId } = req.body;
     if (!password || !confirmPassword || !userId) {
          return res.status(401).json({
               success: false,
               message: "All fields are required!"
          });
     }

     if (password !== confirmPassword) {
          return res.status(200).json({
               success: false,
               message: "Password and confirm password must be same!"
          });
     }

     const securePassword = await bcrypt.hash(password, 7);
     const user = await userModel.findById(userId);

     if (user.isGoogle) {
          return res.status(200).json({
               success: false,
               message: "Unable to chnage password for google account!"
          })
     }

     user.password = securePassword;
     await user.save();

     res.status(200).json({
          success: true,
          message: "password updated successfully!"
     });
}

exports.changeName = async (req, res) => {
     const { username, userId } = req.body;
     if (!username || !userId) {
          return res.status(401).json({
               success: false,
               message: "Username required!"
          });
     }

     const user = await userModel.findByIdAndUpdate(userId, { username }, { new: true });
     res.status(200).json({
          success: true,
          message: "Username Updated!",
          user
     });

}

exports.deleteUser = async (req, res) => {
     const { userId } = req.body;
     if (!userId) return res.status(401).json({
          success: false,
          message: "userId required!"
     });

     await userModel.findByIdAndDelete(userId);
     res.clearCookie("ticket");
     res.status(200).json({
          success: true,
          message: "User Deleted successfully!"
     });
}