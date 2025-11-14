require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventsRoute = require('./src/routes/events');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gcal_clone';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
  console.log("Connected to:", MONGO_URI);


app.use('/api/events', eventsRoute);

app.get('/', (req, res) => res.send({ ok: true, message: 'GCal-clone backend' }));

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));
