const express = require('express');
const auth = express.Router();
const { userModel } = require('../mongoose/model/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Signup

auth.post('/signup', async (req, res) => {
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
               secure: false,
               maxAge: 30 * 24 * 60 * 60 * 1000
          });
          res.status(201).json({ success: true, message: "User Created", user });
     } catch (e) {
          res.status(200).json({
               success: false,
               message: e.message
          });
     }
});


// login

auth.get('/login', async (req, res) => {
     const { email, password } = req.query;
     console.log(email, passport);

     let user = await userModel.findOne({ email });
     let google = user?.isGoogle;

     if (!user) return res.status(200).json({ success: false, message: "User Not Found" });
     if (google && user) return res.status(200).json({ success: false, message: "Email already used by google Login, try to login with google" });

     try {
          let compare = bcrypt.compare(password, user.password);
          if (!compare) return res.status(200).json({ success: false, message: "Incorrect Password" });

          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
          res.cookie('ticket', token, {
               secure: false,
               httpOnly: true,
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
});

// logout

auth.get('/logout', async (req, res) => {
     try {
          res.clearCookie('ticket');
          res.status(200).json({ success: true, message: "logged Out Successfully", user: {} });
     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
});

// google auth

auth.get('/google', passport.authenticate("google", {
     session: false,
     scope: ["profile", "email"],
     failureRedirect: '/redirect'
}), async (req, res) => {
     console.log("bug", req);

     try {
          let token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
          res.cookie('ticket', token, {
               secure: false,
               httpOnly: true,
               maxAge: 30 * 24 * 60 * 60 * 1000
          });
          // console.log(token);
          res.redirect(`${process.env.FRONTEND_URI}/dashboard/env/home`);
     } catch (e) {
          res.status(200).json({ success: false, message: e.message });
     }
});

// get token 

auth.get('/token', async (req, res) => {
     const ticket = req.cookies.ticket;
     if (!ticket) return res.status(200).json({ success: false, message: "Login required" });

     try {
          let data = jwt.verify(ticket, process.env.JWT_SECRET);
          if (data.userId) {
               const user = await userModel.findById(data.userId);
               res.status(200).json({ success: true, message: "verified successfully", user })
          }
     } catch (error) {
          res.status(200).json({ success: false, message: e.message });
     }
});


// google failureRedirect

auth.get('/redirect', async (req, res) => {
     res.redirect(`${process.env.FRONTEND_URI}/auth/login`);
});




module.exports = auth;