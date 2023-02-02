const express = require('express');
const app = express();
const port = 6001;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});