import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import passport from "passport";

// Register a new user
export async function register(req, res) {
  try {
    const { displayname, username, email, password, interests } = req.body;
    const registeredUser = await User.register({ displayname, username, email, interests }, password);
    if (registeredUser) {
      await passport.authenticate("local", (err, user, info) => {
        if (err) {
          return res.status(400).json({ msg: "Registration failed." });
        }
        req.logIn(user, (err) => {
          if (err) {
            return res.status(400).json({ msg: "Registration failed." });
          }
          return res.status(201).json({ user: registeredUser });
        });
      })(req, res);
    } else {
      res.status(400).json({ msg: "Registration failed." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// A method to login a user and return their data
export async function login(req, res) {
  try {
    passport.authenticate("local", { successReturnToOrRedirect: '/home', failureRedirect: '/login' }, (err, user, info) => {
      if (err) { throw new Error(err); }
      if (!user) { return res.status(400).json({ msg: info.message }); }
      req.login(user, (err) => {
        if (err) { throw new Error(err); }
        return res.status(200).json({ user });
      });
    })(req, res);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// A method to logout a user
export async function logout(req, res) {
  try {
    if (req.isAuthenticated()) {
      req.logout((err) => {
        if (err) { throw new Error(err); }
        res.status(200).json({ msg: "Logout successful." });
      });
    } else {
      res.status(400).json({ msg: "You are not logged in." });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}