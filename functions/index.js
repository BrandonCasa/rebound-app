// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

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
