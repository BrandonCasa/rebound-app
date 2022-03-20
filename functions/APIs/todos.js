const { db } = require("../util/admin");

// Here we are fetching all the todos from the database and forwarding them to the client in a list.
exports.getAllTodos = (request, response) => {
  db.collection("todos")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let todos = [];
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(todos);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.postOneTodo = (request, response) => {
  console.log(request.body);
  if (request.body.body.trim() === "") {
    return response.status(400).json({ body: "Must not be empty" });
  }

  if (request.body.title.trim() === "") {
    return response.status(400).json({ title: "Must not be empty" });
  }

  const newTodoItem = {
    title: request.body.title,
    body: request.body.body,
    createdAt: new Date().toISOString(),
  };
  db.collection("todos")
    .add(newTodoItem)
    .then((doc) => {
      const responseTodoItem = newTodoItem;
      responseTodoItem.id = doc.id;
      return response.json(responseTodoItem);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};
