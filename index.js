const express=require('express');
const app=express();
var cors = require('cors')
const connectToDb=require('./db')
connectToDb();

app.use(cors())
app.use(express.json());
const port = 5000;

app.use('/api/auth',require('./router/auth'));
app.use('/api/notes',require('./router/notees'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})