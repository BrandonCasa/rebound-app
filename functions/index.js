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
  // Verify that the function is called while authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  // Verify that the new banner provided is a valid data URL
  if (data.newBanner && !validDataUrl(data.newBanner)) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid data URL.");
  }

  const userId = context.auth.uid;
  const userRef = admin.firestore().collection("users").doc(userId);
  let userDoc = await userRef.get();

  // Update the user's banner to "changing"
  if (userDoc.exists) {
    await userRef.update({
      bannerChanging: true,
      bannerName: null,
    });
  } else {
    // If the user does not exist in Firestore, create the document with default values
    const { displayName, metadata } = await admin.auth().getUser(userId);
    await userRef.set({
      bio: "Hello! I'm a new user.",
      displayName: displayName,
      uid: userId,
      bannerChanging: true,
      bannerName: null,
      avatarChanging: false,
      avatarName: null,
      creationTime: metadata.creationTime,
    });
  }

  // Delete the old banner if it exists
  let files = await bucket.getFiles({ directory: `users/${userId}/banner/` });
  if (files[0].length > 0) {
    await files[0].forEach(async (file) => {
      await file.delete();
    });
  }

  if (data.newBanner) {
    // Generate new banner information
    const imageData = data.newBanner.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    const imageExtension = data.newBanner.match(/[^:/]\w+(?=;|,)/)[0];
    const imageHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString();
    const uniqueName = `${imageHash.substring(0, 16)}.${imageExtension}`;

    // Upload the new banner
    let uploaded = false;
    try {
      await bucket.file(`users/${userId}/banner/${uniqueName}`).save(imageBuffer, { public: true, gzip: true });
      uploaded = true;
    } catch (err) {
      console.error(err);
    }

    // Update the user's banner information
    await userRef.update({
      bannerChanging: false,
      bannerName: uploaded ? uniqueName : null,
    });
  } else {
    // If no new banner is provided, update the banner to "not changing"
    await userRef.update({ bannerChanging: false });
  }
  return "Complete";
});

exports.changeAvatar = functions.region("us-central1").https.onCall(async (data, context) => {
  // Verify that the function is called while authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  // Verify that the new avatar provided is a valid data URL
  if (data.newAvatar && !validDataUrl(data.newAvatar)) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a valid data URL.");
  }

  const userId = context.auth.uid;
  const userRef = admin.firestore().collection("users").doc(userId);
  let userDoc = await userRef.get();

  // Update the user's avatar to "changing"
  if (userDoc.exists) {
    await userRef.update({
      avatarChanging: true,
      avatarName: null,
    });
  } else {
    // If the user does not exist in Firestore, create the document with default values
    const { displayName, metadata } = await admin.auth().getUser(userId);
    await userRef.set({
      bio: "Hello! I'm a new user.",
      displayName: displayName,
      uid: userId,
      bannerChanging: false,
      bannerName: null,
      avatarChanging: true,
      avatarName: null,
      creationTime: metadata.creationTime,
    });
  }

  // Delete the old avatar if it exists
  let files = await bucket.getFiles({ directory: `users/${userId}/avatar/` });
  if (files[0].length > 0) {
    await files[0].forEach(async (file) => {
      await file.delete();
    });
  }

  if (data.newAvatar) {
    // Generate new avatar information
    const imageData = data.newAvatar.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(imageData, "base64");
    const imageExtension = data.newAvatar.match(/[^:/]\w+(?=;|,)/)[0];
    const imageHash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newAvatar)).toString();
    const uniqueName = `${imageHash.substring(0, 16)}.${imageExtension}`;

    // Upload the new avatar
    let uploaded = false;
    try {
      await bucket.file(`users/${userId}/avatar/${uniqueName}`).save(imageBuffer, { public: true, gzip: true });
      uploaded = true;
    } catch (err) {
      console.error(err);
    }

    // Update the user's avatar information
    await userRef.update({
      avatarChanging: false,
      avatarName: uploaded ? uniqueName : null,
    });
  } else {
    // If no new avatar is provided, update the avatar to "not changing"
    await userRef.update({ avatarChanging: false });
  }
  return "Complete";
});

exports.changeDisplayName = functions.region("us-central1").https.onCall(async (data, context) => {
  // Verify that the function is called while authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  // Verify that newDisplayName is provided
  if (!data.newDisplayName) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a new display name.");
  }

  const userId = context.auth.uid;
  const userRef = admin.firestore().collection("users").doc(userId);
  const userDoc = await userRef.get();

  // Update the user's display name
  if (userDoc.exists) {
    await userRef.update({
      displayName: data.newDisplayName,
    });
  } else {
    // If the user does not exist in Firestore, create the document with default values
    const { metadata } = await admin.auth().getUser(userId);
    await userRef.set({
      bio: "Hello! I'm a new user.",
      displayName: data.newDisplayName,
      uid: userId,
      bannerChanging: false,
      bannerName: null,
      avatarChanging: false,
      avatarName: null,
      creationTime: metadata.creationTime,
    });
  }

  return "Complete";
});

exports.changeBio = functions.region("us-central1").https.onCall(async (data, context) => {
  // Verify that the function is called while authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
  }

  // Verify that newBio is provided
  if (!data.newBio) {
    throw new functions.https.HttpsError("invalid-argument", "The function must be called with a new bio.");
  }

  const userId = context.auth.uid;
  const userRef = admin.firestore().collection("users").doc(userId);
  const userDoc = await userRef.get();

  // Update the user's bio
  if (userDoc.exists) {
    await userRef.update({
      bio: data.newBio,
    });
  } else {
    // If the user does not exist in Firestore, create the document with default values
    const { metadata } = await admin.auth().getUser(userId);
    await userRef.set({
      bio: data.newBio,
      uid: userId,
      bannerChanging: false,
      bannerName: null,
      avatarChanging: false,
      avatarName: null,
      creationTime: metadata.creationTime,
    });
  }

  return "Complete";
});
