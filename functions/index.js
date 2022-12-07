/* eslint-disable no-undef */
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
var CryptoJS = require("crypto-js");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

const bucketName = "rebound-380d6.appspot.com";

admin.initializeApp({});
admin.firestore().settings({ ignoreUndefinedProperties: true });

const storage = admin.storage();
const bucket = storage.bucket(bucketName);

function randomToken(size = 20) {
  // maxsize is 128
  return crypto.randomBytes(64).toString("hex").substr(0, size);
}

exports.changeBanner = functions.region("us-central1").https.onCall(async (data, context) => {
  // Takes in: auth, newBanner, hasBanner
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "while authenticated.");
  }

  const imageData = data.newBanner.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  const mimeType = data.newBanner.substring(5, data.newBanner.substring(0, 25).indexOf(";"));
  const uniqueName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString().substring(0, 25) + "." + mimeType.split("/")[1];
  const [files] = await bucket.getFiles({ directory: `users/${context.auth.uid}/banner/` });
  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();
  if (userDoc.exists) {
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      hasBanner: data.hasBanner,
      bannerName: uniqueName,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ hasBanner: data.hasBanner, bannerName: uniqueName });
  }
  await files.forEach(async (file) => {
    await file.delete();
  });
  bucket
    .file(`users/${context.auth.uid}/banner/${uniqueName}`)
    .save(imageBuffer, { public: true, gzip: true })
    .then(async (data) => {
      console.log("Image uploaded to bucket");
    })
    .catch(async (err) => {
      console.log(err);
    });
  return "Complete";
});
