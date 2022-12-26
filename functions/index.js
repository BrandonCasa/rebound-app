// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

const functions = require("firebase-functions");
var CryptoJS = require("crypto-js");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

const bucketName = "rebound-380d6.appspot.com";

admin.initializeApp({});
admin.firestore().settings({ ignoreUndefinedProperties: true });

const storage = admin.storage();
const bucket = storage.bucket(bucketName);

exports.changeBanner = functions.region("us-central1").https.onCall(async (data, context) => {
  // Takes in: auth, newBanner, hasBanner
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const [files] = await bucket.getFiles({ directory: `users/${context.auth.uid}/banner/` });
  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();

  // Update the user's banner to changing
  if (userDoc.exists) {
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      bannerChanging: true,
      bannerName: null,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ bannerChanging: true, bannerName: null });
  }

  // Delete the old banner
  await files.forEach(async (file) => {
    await file.delete();
  });

  // Update the banner to what is provided
  if (data.newBanner === undefined) {
    // If no new banner is provided, update the banner to changed
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      bannerChanging: false,
      bannerName: null,
    });
  } else {
    // Generate new banner information
    const imageData = data.newBanner.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    const mimeType = data.newBanner.substring(5, data.newBanner.substring(0, 25).indexOf(";"));
    const uniqueName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString().substring(0, 25) + "." + mimeType.split("/")[1];

    // Upload the new banner
    let uploaded = false;
    await bucket
      .file(`users/${context.auth.uid}/banner/${uniqueName}`)
      .save(imageBuffer, { public: true, gzip: true })
      .then((data) => {
        uploaded = true;
      })
      .catch(async (err) => {
        console.log(err);
      });

    // Update the user's banner information
    await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        bannerChanging: false,
        bannerName: uploaded ? uniqueName : null,
      });
  }
  return "Complete";
});

exports.changeDisplayName = functions.region("us-central1").https.onCall(async (data, context) => {
  // Takes in: auth, newBanner, hasBanner
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const [files] = await bucket.getFiles({ directory: `users/${context.auth.uid}/banner/` });
  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();

  // Update the user's banner to changing
  if (userDoc.exists) {
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      bannerChanging: true,
      bannerName: null,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ bannerChanging: true, bannerName: null });
  }

  // Delete the old banner
  await files.forEach(async (file) => {
    await file.delete();
  });

  // Update the banner to what is provided
  if (data.newBanner === undefined) {
    // If no new banner is provided, update the banner to changed
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      bannerChanging: false,
      bannerName: null,
    });
  } else {
    // Generate new banner information
    const imageData = data.newBanner.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    const mimeType = data.newBanner.substring(5, data.newBanner.substring(0, 25).indexOf(";"));
    const uniqueName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString().substring(0, 25) + "." + mimeType.split("/")[1];

    // Upload the new banner
    let uploaded = false;
    await bucket
      .file(`users/${context.auth.uid}/banner/${uniqueName}`)
      .save(imageBuffer, { public: true, gzip: true })
      .then((data) => {
        uploaded = true;
      })
      .catch(async (err) => {
        console.log(err);
      });

    // Update the user's banner information
    await admin
      .firestore()
      .collection("users")
      .doc(context.auth.uid)
      .update({
        bannerChanging: false,
        bannerName: uploaded ? uniqueName : null,
      });
  }
  return "Complete";
});
