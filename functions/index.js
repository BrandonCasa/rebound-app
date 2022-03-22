const functions = require("firebase-functions");
const app = require("express")();

const { getAllTodos, postOneTodo, deleteTodo, editTodo } = require("./APIs/todos");

app.put("/todo/:todoId", editTodo);
app.delete("/todo/:todoId", deleteTodo);
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
