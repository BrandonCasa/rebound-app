import express from "express";
import { acceptFriendRequest, addFriend, cancelFriendRequest, declineFriendRequest, getUser, removeFriend, setAboutMe, setDisplayName, setInterests } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";
import { User } from "../models/User.js";
import passport from "passport";

const router = express.Router();

// Read
router.get("/profile/:userId", getUser);

// Update
router.get("/checklogin", verifyToken, (req, res) => {
  return res.send(req.user);
});
router.get("/me/changename", verifyToken, setDisplayName);
router.get("/me/changeaboutme", verifyToken, setAboutMe);
router.get("/me/changeinterests", verifyToken, setInterests);
router.patch("/friend/send/:friendId", verifyToken, addFriend);
router.patch("/friend/remove/:friendId", verifyToken, removeFriend);
router.patch("/friend/accept/:friendId", verifyToken, acceptFriendRequest);
router.patch("/friend/decline/:friendId", verifyToken, declineFriendRequest);
router.patch("/friend/cancel/:friendId", verifyToken, cancelFriendRequest);


export default router;