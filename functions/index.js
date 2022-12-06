/* eslint-disable no-undef */
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
var CryptoJS = require("crypto-js");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });
const storageRef = admin.storage().bucket("gs://rebound-380d6.appspot.com");

exports.createServer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
  }

  const uid = context.auth.uid;
  return {
    message: `Hello ${uid}!`,
  };
});

exports.addServerNew = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const serverData = {
      name: JSON.parse(req.body).name,
      description: JSON.parse(req.body).description,
      subject: JSON.parse(req.body).subject,
      iconPath: "",
      bannerPath: "",
      ownerID: JSON.parse(req.body).auth.currentUser.uid,
    };
    const writtenServer = await admin.firestore().collection("servers").add({ serverData: serverData });
    const writtenChannel = await writtenServer.collection("channels").add({ channelData: { name: "General", description: "A generalized place to talk." } });
    console.log(`Server with ID ${writtenServer.id} created. Channel with ID ${writtenChannel.id} added.`);

    const userDoc = await admin.firestore().collection("users").doc(serverData.ownerID).get();
    if (userDoc.exists) {
      const writtenUser = await admin
        .firestore()
        .collection("users")
        .doc(serverData.ownerID)
        .update({
          servers: admin.firestore.FieldValue.arrayUnion(writtenServer.id),
        });
    } else {
      await admin
        .firestore()
        .collection("users")
        .doc(serverData.ownerID)
        .set({ servers: [writtenServer.id] });
    }

    res.json({ server: writtenServer.id, channel: writtenChannel.id });
  });
});

exports.joinServer = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    //find server that starts with id substring
    const foundServer = await admin
      .firestore()
      .collection("servers")
      .where(admin.firestore.FieldPath.documentId(), ">=", JSON.parse(req.body).serverID)
      .where(admin.firestore.FieldPath.documentId(), "<", JSON.parse(req.body).serverID + "\uf8ff")
      .get();

    // The below returns a list of search results
    //console.log(foundServer.docs);

    const userDoc = await admin.firestore().collection("users").doc(JSON.parse(req.body).auth.currentUser.uid).get();
    if (userDoc.exists) {
      const writtenUser = await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .update({
          servers: admin.firestore.FieldValue.arrayUnion(foundServer.docs[0].id),
        });
    } else {
      await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .set({ servers: [foundServer.docs[0].id] });
    }

    return res.sendStatus(200);
  });
});

exports.changeBio = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userDoc = await admin.firestore().collection("users").doc(JSON.parse(req.body).auth.currentUser.uid).get();
    if (userDoc.exists) {
      const writtenUser = await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .update({
          bio: JSON.parse(req.body).newBio,
        });
    } else {
      await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .set({ bio: JSON.parse(req.body).newBio });
    }

    return res.sendStatus(200);
  });
});

exports.changeDisplayName = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userDoc = await admin.firestore().collection("users").doc(JSON.parse(req.body).auth.currentUser.uid).get();
    if (userDoc.exists) {
      const writtenUser = await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .update({
          displayName: JSON.parse(req.body).newDisplayName,
        });
    } else {
      await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .set({ displayName: JSON.parse(req.body).newDisplayName });
    }

    return res.sendStatus(200);
  });
});

exports.changeColor = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const userDoc = await admin.firestore().collection("users").doc(JSON.parse(req.body).auth.currentUser.uid).get();
    if (userDoc.exists) {
      const writtenUser = await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .update({
          color: JSON.parse(req.body).newColor,
        });
    } else {
      await admin
        .firestore()
        .collection("users")
        .doc(JSON.parse(req.body).auth.currentUser.uid)
        .set({ color: JSON.parse(req.body).newColor });
    }

    return res.sendStatus(200);
  });
});

exports.changeBanner = functions.https.onCall(async (data, context) => {
  // Takes in: auth, newBanner, hasBanner
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "The function must be called " + "while authenticated.");
  }
  const userDoc = await admin.firestore().collection("users").doc(context.auth.uid).get();
  if (userDoc.exists) {
    const writtenUser = await admin.firestore().collection("users").doc(context.auth.uid).update({
      hasBanner: data.hasBanner,
    });
  } else {
    await admin.firestore().collection("users").doc(context.auth.uid).set({ hasBanner: data.hasBanner });
  }
  const imageData = data.newBanner.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  const imageByteArray = new Uint8Array(imageBuffer);
  const mimeType = data.newBanner.substring(5, data.newBanner.substring(0, 25).indexOf(";"));
  if (!fs.existsSync(`./tempStorage/`)) {
    await fs.mkdirSync(`./tempStorage/`);
    await fs.mkdirSync(`./tempStorage/users/`);
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/`);
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/banner/`);
  } else if (!fs.existsSync(`./tempStorage/users/`)) {
    await fs.mkdirSync(`./tempStorage/users/`);
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/`);
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/banner/`);
  } else if (!fs.existsSync(`./tempStorage/users/${context.auth.uid}/`)) {
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/`);
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/banner/`);
  } else if (!fs.existsSync(`./tempStorage/users/${context.auth.uid}/banner/`)) {
    await fs.mkdirSync(`./tempStorage/users/${context.auth.uid}/banner/`);
  }
  const uniqueName = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data.newBanner)).toString().substring(0, 25) + "." + mimeType.split("/")[1];
  const options = { resumable: false, metadata: { contentType: mimeType }, destination: `users/${context.auth.uid}/banner/${uniqueName}` };
  await fs.writeFile(`./tempStorage/users/${context.auth.uid}/banner/${uniqueName}`, imageByteArray, async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
      const [files] = await storageRef.getFiles({ directory: `users/${context.auth.uid}/banner/` });
      files.forEach(async (file) => {
        await file.delete();
      });
      const uploadSnapshot = await storageRef.upload(`./tempStorage/users/${context.auth.uid}/banner/${uniqueName}`, options);
    }
  });

  return "Complete";
});
