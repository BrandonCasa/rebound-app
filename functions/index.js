// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const data = [
    {
      pos: 0,
      text: req.body.text,
      media: null,
      mentions: null,
      references: null,
    },
  ];
  // Push the new message into Firestore using the Firebase Admin SDK.
  //const writeResult = await admin.firestore().collection("messages").add({ original: original });
  const writeResult = await admin.firestore().collection("channels").doc("testChannel").collection("messages").add({ data: data });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
