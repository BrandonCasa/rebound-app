// https://youtu.be/K8YELRmUb5o?t=3764
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import winston from "winston";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { register } from "./controllers/auth.js"
import passport from "passport";
import session from "express-session";
import LocalStrategy from "passport-local";
import { User } from "./models/User.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

// Use Winston to log all errors
const logger = winston.createLogger({
  level: 'error',
  transports: [new winston.transports.Console()]
});
app.use((err, req, res, next) => {
  logger.error(err.stack);
  next(err);
});

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET,
  cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes With Files
app.post("/auth/register", upload.single("picture"), register);

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`${error} did not connect.`);
});