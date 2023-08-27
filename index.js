const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); 
app.use(cors())
async function boom()
{

  // await connectMongoDB();
  const URI ="mongodb+srv://trishalini973:Sairam%401312@cluster0.a1krhab.mongodb.net";

  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json());
  // app.use((req, res, next) => {
  //   req.database = getDatabase();
  //   next();
  //  });

//   app.get('/test', (req, res) => {
//   res.send("GET Request Called");
//   })

  app.use('/api', routes);


}

boom();

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
  });
  