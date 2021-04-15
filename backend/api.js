const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const {
  MongoClient
} = require('mongodb');
const e = require('express');
const port = 3080;




//connection to mongo db
const uri = 'mongodb+srv://yash:admin@123@sics1.orqvd.mongodb.net/project0?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    var database = client.db('project0');
  } catch {
    await client.close();
  }
}
run().catch(console.dir);




// place holder for the data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../nextpro/out/index.html')));


//get data of users api
app.get('/api/users', async (req, res) => {
  console.log('api/users called!')
  var database = client.db('project0');
  const data = await database.collection('users').find().toArray();
  if (data) {
    res.send(data);
  } else {
    return res.status(400).json({
      status: false,
      message: "bad request"
    })
  }
});

//add user in mongo db api
app.post('/api/user', async (req, res, next) => {
  const user = req.body.user;
  var database = client.db('project0');
  const data = await database.collection('users').insertOne(user);
  if (data) {
    return res.status(200).json({
      status: true,
      message: "user added successfullly"
    })
  } else {
    return res.status(400).json({
      status: false,
      message: "bad request"
    })
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../nextpro/out/index.html'));
});

//running port
app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});