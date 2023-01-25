import { User } from "../models/User.js";
import mongoose from "mongoose";

const privateFieldsArr = ["username", "email", "friendRequestsIn", "friendRequestsOut", "servers", "activitySessions", "statusSessions", "password", "__v", "updatedAt"];
const privateFieldsString = "-" + privateFieldsArr.join(" -");

// Get a user by ID
export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "User not found" });
    }
    let user = await User.findById(userId).select(privateFieldsString);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Set a user's displayname
export const setDisplayName = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { displayname: req.body.newname }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Set a user's about me
export const setAboutMe = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { aboutMe: req.body.newaboutme }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Set a user's interests
export const setInterests = async (req, res) => {
  try {
    const { _id } = req.user;
    const newUser = await User.findByIdAndUpdate(_id, { interests: req.body.newinterests }, { new: true })
    return res.status(200).json({ message: "Display name changed.", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Clean up a user's friend requests by removing any that are not mutual
export const cleanFriendRequests = async (_id) => {
  try {
    const user = await User.findById(_id);
    let newFriendRequestsIn = [];
    let newFriendRequestsOut = [];
    for (let i = 0; i < user.friendRequestsIn.length; i++) {
      if (mongoose.Types.ObjectId.isValid(user.friendRequestsIn[i])) {
        const friend = await User.findById(user.friendRequestsIn[i]);
        if (friend && friend.friendRequestsOut.includes(_id.toString())) {
          newFriendRequestsIn.push(user.friendRequestsIn[i]);
        }
      }
    }
    for (let i = 0; i < user.friendRequestsOut.length; i++) {
      if (mongoose.Types.ObjectId.isValid(user.friendRequestsOut[i])) {
        const friend = await User.findById(user.friendRequestsOut[i]);
        if (friend && friend.friendRequestsIn.includes(_id.toString())) {
          newFriendRequestsOut.push(user.friendRequestsOut[i]);
        }
      }
    }
    const newUser = await User.findByIdAndUpdate(_id, { friendRequestsIn: newFriendRequestsIn, friendRequestsOut: newFriendRequestsOut }, { new: true });
    return newUser;
  } catch (err) {
    throw new Error(err);;
  }
}

// Clean up a user's friend list by removing any that are not mutual
export const cleanFriends = async (_id) => {
  try {
    const user = await User.findById(_id);
    let newFriends = [];
    for (let i = 0; i < user.friends.length; i++) {
      if (mongoose.Types.ObjectId.isValid(user.friends[i])) {
        const friend = await User.findById(user.friends[i]);
        if (friend && friend.friends.includes(_id.toString())) {
          newFriends.push(user.friends[i]);
        }
      }
    }
    const newUser = await User.findByIdAndUpdate(_id, { friends: newFriends }, { new: true });
    return newUser;
  } catch (err) {
    throw new Error(err);;
  }
}

// Add a friend
export const addFriend = async (req, res) => {
  try {
    const { _id } = req.user;
    req.user = await cleanFriendRequests(_id);
    req.user = await cleanFriends(_id);
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }
    if (user.friendRequestsOut.includes(friendId)) {
      return res.status(400).json({ message: "You have already sent a friend request to this user" });
    }
    if (friend.friendRequestsIn.includes(_id)) {
      return res.status(400).json({ message: "This user has already sent you a friend request" });
    }
    const newUser = await User.findByIdAndUpdate(_id, { friendRequestsOut: [...user.friendRequestsOut, friendId] }, { new: true })
    await User.findByIdAndUpdate(friendId, { friendRequestsIn: [...friend.friendRequestsIn, _id.toString()] }, { new: true })
    return res.status(200).json({ message: "Friend request sent", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { _id } = req.user;
    req.user = await cleanFriendRequests(_id);
    req.user = await cleanFriends(_id);
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (!user.friendRequestsIn.includes(friendId)) {
      return res.status(400).json({ message: "You do not have a friend request from this user" });
    }
    const newUser = await User.findByIdAndUpdate(_id, { friendRequestsIn: user.friendRequestsIn.filter(id => id !== friendId), friends: [...user.friends, friendId] }, { new: true })
    await User.findByIdAndUpdate(friendId, { friendRequestsOut: friend.friendRequestsOut.filter(id => id !== _id.toString()), friends: [...friend.friends, _id.toString()] }, { new: true })
    return res.status(200).json({ message: "Friend request accepted", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Decline a friend request
export const declineFriendRequest = async (req, res) => {
  try {
    const { _id } = req.user;
    req.user = await cleanFriendRequests(_id);
    req.user = await cleanFriends(_id);
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (!user.friendRequestsIn.includes(friendId)) {
      return res.status(400).json({ message: "You do not have a friend request from this user" });
    }
    const newUser = await User.findByIdAndUpdate(_id, { friendRequestsIn: user.friendRequestsIn.filter(id => id !== friendId) }, { new: true })
    await User.findByIdAndUpdate(friendId, { friendRequestsOut: friend.friendRequestsOut.filter(id => id !== _id.toString()) }, { new: true })
    return res.status(200).json({ message: "Friend request declined", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Cancel a friend request
export const cancelFriendRequest = async (req, res) => {
  try {
    const { _id } = req.user;
    req.user = await cleanFriendRequests(_id);
    req.user = await cleanFriends(_id);
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (!user.friendRequestsOut.includes(friendId)) {
      return res.status(400).json({ message: "You do not have a friend request to this user" });
    }
    const newUser = await User.findByIdAndUpdate(_id, { friendRequestsOut: user.friendRequestsOut.filter(id => id !== friendId) }, { new: true })
    await User.findByIdAndUpdate(friendId, { friendRequestsIn: friend.friendRequestsIn.filter(id => id !== _id.toString()) }, { new: true })
    return res.status(200).json({ message: "Friend request canceled", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Remove a friend
export const removeFriend = async (req, res) => {
  try {
    const { _id } = req.user;
    req.user = await cleanFriendRequests(_id);
    req.user = await cleanFriends(_id);
    const { friendId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(404).json({ message: "User not found" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(_id);
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "You are not friends with this user" });
    }
    const newUser = await User.findByIdAndUpdate(_id, { friends: user.friends.filter(id => id !== friendId) }, { new: true })
    await User.findByIdAndUpdate(friendId, { friends: friend.friends.filter(id => id !== _id.toString()) }, { new: true })
    return res.status(200).json({ message: "Friend removed", user: newUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}