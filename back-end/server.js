const express = require('express');
const bodyParser = require("body-parser");
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  year: Number,
  genre: String,
  path: String,
});

const Album = mongoose.model('Album', albumSchema);

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  path: String,
});

const Song = mongoose.model('Song', songSchema);

app.post('/api/albums', async (req, res) => {
  const album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    year: req.body.year,
    genre: req.body.genre,
    path: req.body.path,
  });
  try {
    await album.save();
    res.send(album)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/songs', async (req, res) => {
  const song = new Song ({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    path: req.body.path,
  });
  try {
    await song.save();
    res.send(song);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.get('/api/albums', async (req, res) => {
  try {
    let albums = await Album.find();
    res.send(albums);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    let songs = await Song.find();
    res.send(songs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/albums/:id', async (req, res) => {
  try {
    await Album.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/songs/:id', async (req, res) => {
  try {
    await Song.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/albums/:id', async (req, res) => {
  try {
    let album = await Album.findOne({
      _id: req.params.id
    });
    album.title = req.body.title;
    album.artist = req.body.artist;
    album.year = req.body.year;
    album.genre = req.body.genre;
    album.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/songs/:id', async (req, res) => {
  try {
    let song = await Song.findOne({
      _id: req.params.id
    });
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
