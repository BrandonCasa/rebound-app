// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

admin.initializeApp();

exports.addServerMessage = functions.https.onRequest(async (req, res) => {
  const writeResult = await admin
    .firestore()
    .collection("server_chat")
    .doc(req.body.serverID)
    .collection("channels")
    .doc(req.body.channelID)
    .collection("messages")
    .add({ message: req.body.message, timestamp: admin.firestore.FieldValue.serverTimestamp() });
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.addServerChannel = functions.https.onRequest(async (req, res) => {
  const writtenChannel = await admin
    .firestore()
    .collection("server_chat")
    .doc(req.body.serverID)
    .collection("channels")
    .add({ channelData: { name: req.body.name, description: req.body.description } });
  res.json({ result: `Channel with ID ${writtenChannel.id} added to server with ID ${req.body.serverID}` });
});

exports.addServer = functions.https.onRequest(async (req, res) => {
  const serverData = {
    name: req.body.name,
    description: req.body.description,
    iconPath: "",
    bannerPath: "",
    ownerID: "",
  };
  const writtenServer = await admin.firestore().collection("server_chat").add({ serverData: serverData });
  const writtenChannel = await writtenServer.collection("channels").add({ channelData: { name: "general", description: "A generalized place to talk" } });
  res.json({ result: `Server with ID ${writtenServer.id} created. Channel with ID ${writtenChannel.id} added.` });
});
