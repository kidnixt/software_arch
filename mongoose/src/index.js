const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoutes');
//const Task = require('./models/task');

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter)
app.use(messageRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});