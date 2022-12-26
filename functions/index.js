// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

const functions = require("firebase-functions");
var CryptoJS = require("crypto-js");
var validDataUrl = require("valid-data-url");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

const bucketName = "rebound-380d6.appspot.com";

admin.initializeApp({});
admin.firestore().settings({ ignoreUndefinedProperties: true });

const storage = admin.storage();
const bucket = storage.bucket(bucketName);

exports.setupNewUser = functions.auth.user().onCreate(async (user) => {
  // Create a new user document
  await admin.firestore().collection("users").doc(user.uid).set({
    displayName: user.displayName,
    uid: user.uid,
    bannerChanging: false,
    bannerName: null,
    avatarChanging: false,
    avatarName: null,
    creationTime: user.metadata.creationTime,
  });
  return;
});

exports.deleteOldUser = functions.auth.user().onDelete(async (user) => {
  // Delete the user document
  await admin.firestore().collection("users").doc(user.uid).delete();

  // Delete the old banners
  const [banners] = await bucket.getFiles({ directory: `users/${context.auth.uid}/banner/` });
  await banners.forEach(async (file) => {
    await file.delete();
  });

  // Delete the old avatars
  const [avatars] = await bucket.getFiles({ directory: `users/${context.auth.uid}/avatar/` });
  await avatars.forEach(async (file) => {
    await file.delete();
  });
  return;
});

exports.changeBanner = functions.region("us-central1").https.onCall(async (data, context) => {
  // Takes in: auth, newBanner
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }
  if (data.newBanner !== undefined && !validDataUrl(data.newBanner)) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid data url.");
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
    const imageExtension = data.newBanner.match(/[^:/]\w+(?=;|,)/)[0];
    const imageHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString();
    const uniqueName = `${imageHash.substring(0, 16)}.${imageExtension}`;

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

exports.changeAvatar = functions.region("us-central1").https.onCall(async (data, context) => {
  // Takes in: auth, newAvatar
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }
  if (data.newAvatar !== undefined && !validDataUrl(data.newAvatar)) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid data url.");
  }

  const [files] = await bucket.getFiles({ directory: `users/${context.auth.uid}/avatar/` });
  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();

  // Update the user's avatar to changing
  if (userDoc.exists) {
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      avatarChanging: true,
      avatarName: null,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ avatarChanging: true, avatarName: null });
  }

  // Delete the old avatar
  await files.forEach(async (file) => {
    await file.delete();
  });

  // Update the avatar to what is provided
  if (data.newAvatar === undefined) {
    // If no new avatar is provided, update the avatar to changed
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      avatarChanging: false,
      avatarName: null,
    });
  } else {
    // Generate new avatar information
    const imageData = data.newAvatar.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    const imageExtension = data.newAvatar.match(/[^:/]\w+(?=;|,)/)[0];
    const imageHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newAvatar)).toString();
    const uniqueName = `${imageHash.substring(0, 16)}.${imageExtension}`;

    // Upload the new banner
    let uploaded = false;
    await bucket
      .file(`users/${context.auth.uid}/avatar/${uniqueName}`)
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
        avatarChanging: false,
        avatarName: uploaded ? uniqueName : null,
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

  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();

  // Update the user's banner to changing
  if (userDoc.exists) {
    await admin.firestore().collection("users").doc(context.auth.uid).update({
      displayName: data.newDisplayName,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ displayName: data.newDisplayName });
  }
  return "Complete";
});
