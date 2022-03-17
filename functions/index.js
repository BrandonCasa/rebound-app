const functions = require("firebase-functions");
const app = require("express")();

const { getAllTodos, postOneTodo } = require("./APIs/todos");

app.get("/todos", getAllTodos);
app.post("/todo", postOneTodo);
exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
