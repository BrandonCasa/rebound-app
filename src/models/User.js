import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  displayname: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picturePath: {
    type: String,
    default: ""
  },
  friends: {
    type: Array,
    default: []
  },
  friendRequestsIn: {
    type: Array,
    default: []
  },
  friendRequestsOut: {
    type: Array,
    default: []
  },
  aboutMe: {
    type: String,
    max: 300,
    default: ""
  },
  standing: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
    default: []
  },
  interests: {
    type: Array,
    default: []
  },
  servers: {
    type: Array,
    default: []
  },
  activitySessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserActivitySession"
  }],
  statusSessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserStatusSession"
  }],
}, { timestamps: true });

// Plugin for passport-local-mongoose 
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

const UserActivitySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: { type: Date },
  endTime: { type: Date, default: Date.now },
  activity: { type: String },
});

const UserActivitySession = mongoose.model("UserActivitySession", UserActivitySessionSchema);

const UserStatusSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startTime: { type: Date },
  endTime: { type: Date, default: Date.now },
  status: { type: String },
});

const UserStatusSession = mongoose.model("UserStatusSession", UserStatusSessionSchema);

export { User, UserActivitySession, UserStatusSession };