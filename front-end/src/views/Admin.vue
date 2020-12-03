<template>
  <div class="admin">
    <h2>Welcome, Administrator</h2>
    <p>Use this page to add, delete, and update the albums and songs on your page.</p>
    <p>Click the button to toggle between editing the Albums page and the Songs page.</p>
    <div id="buttonContainer">
      <button @click="toggle = !toggle">Switch</button>
    </div>
    <div v-if="toggle">
      <div class="add">
        <h3>Add Albums</h3>
        <div class="form">
          <label>Album Title:</label><br/>
          <input type="text" id="albumTitle" v-model="albumTitle"><br/><br/>
          <label>Album Artist:</label><br/>
          <input type="text" id="albumArtist" v-model="albumArtist"><br/><br/>
          <label>Release Year:</label><br/>
          <input type="number" id="year" v-model="year"><br/><br/>
          <label>Album Genre:</label><br/>
          <input type="text" id="genre" v-model="genre"><br/><br/>
          <label>Upload a photo to go with your album, either the album
            cover or a photo you associate with the album.<br/>Your grid will look nicer
            if all the pictures are the same dimensions!</label><br/><br/>
          <input type="file" id="albumFile" name="photo" @change="fileChanged">
          <button @click="uploadAlbum">Upload</button>
        </div>
      </div>
      <div class="update">
        <h3>Update/Delete Album</h3>
        <div class="form">
          <input v-model="findAlbumTitle" type="text" placeholder="Search">
          <div class="suggestions" v-if="albumSuggestions.length > 0">
            <div class="suggestion" v-for="s in albumSuggestions" :key="s.id" @click="selectAlbum(s)">{{s.title}}
            </div>
          </div>
        </div>
        <div v-if="findAlbum">
          <input class="editInput" type="text" v-model="findAlbum.title"><br/>
          <input class="editInput" type="text" v-model="findAlbum.artist"><br/>
          <input class="editInput" type="number" v-model="findAlbum.year"><br/>
          <input class="editInput" type="text" v-model="findAlbum.genre"><br/>
          <img :src="findAlbum.path" />
        </div>
        <div class="actions" v-if="findAlbum">
          <button @click="deleteAlbum(findAlbum)">Delete</button>
          <button @click="editAlbum(findAlbum)">Edit</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="add">
        <h3>Add Songs</h3>
        <div class="form">
          <label>Song Title:</label><br/>
          <input type="text" id="songTitle" v-model="songTitle"><br/><br/>
          <label>Song Artist:</label><br/>
          <input type="text" id="songArtist" v-model="songArtist"><br/><br/>
          <label>Album:</label><br/>
          <input type="text" id="songAlbum" v-model="album"><br/><br/>
          <label>Upload a photo to go with your album, either the album
            cover or a photo you associate with the album.<br/>Your grid will look nicer
            if all the pictures are the same dimensions!</label><br/><br/>
          <input type="file" id="songFile" name="photo" @change="fileChanged">
          <button @click="uploadSong">Upload</button>
        </div>
      </div>
      <div class="update">
        <h3>Update/Delete Album</h3>
        <div class="form">
          <input v-model="findSongTitle" type="text" placeholder="Search">
          <div class="suggestions" v-if="songSuggestions.length > 0">
            <div class="suggestion" v-for="s in songSuggestions" :key="s.id" @click="selectSong(s)">{{s.title}}
            </div>
          </div>
        </div>
        <div v-if="findSong">
          <input class="editInput" type="text" v-model="findSong.title"><br/>
          <input class="editInput" type="text" v-model="findSong.artist"><br/>
          <input class="editInput" type="text" v-model="findSong.album"><br/>
          <img :src="findSong.path" />
        </div>
        <div class="actions" v-if="findSong">
          <button @click="deleteSong(findSong)">Delete</button>
          <button @click="editSong(findSong)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Admin",
  data() {
    return {
      toggle: false,
      albumTitle: "",
      albumArtist: "",
      year: 0,
      genre: "",
      songTitle: "",
      songArtist: "",
      album: "",
      albums: [],
      songs: [],
      findAlbumTitle: "",
      findAlbum: "",
      findSongTitle: "",
      findSong: "",
    }
  },
  computed: {
    albumSuggestions() {
      let albums = this.albums.filter(album => album.title.toLowerCase().startsWith(this.findAlbumTitle.toLowerCase()));
      return albums.sort((a, b) => a.title > b.title);
    },
    songSuggestions() {
      let songs = this.songs.filter(song => song.title.toLowerCase().startsWith(this.findSongTitle.toLowerCase()));
      return songs.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getAlbums();
    this.getSongs();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async uploadAlbum() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        await axios.post('/api/albums', {
          title: this.albumTitle,
          artist: this.albumArtist,
          year: this.year,
          genre: this.genre,
          path: r1.data.path
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById("albumTitle").value = "";
      document.getElementById("albumArtist").value = "";
      document.getElementById("year").value = "";
      document.getElementById("genre").value = "";
      document.getElementById("albumFile").value = "";
    },
    async uploadSong() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        await axios.post('/api/songs', {
          title: this.songTitle,
          artist: this.songArtist,
          album: this.album,
          path: r1.data.path
        });
      } catch (error) {
        console.log(error);
      }
      document.getElementById("songTitle").value = "";
      document.getElementById("songArtist").value = "";
      document.getElementById("songAlbum").value = "";
      document.getElementById("songFile").value = "";
    },
    async getAlbums() {
      try {
        let response = await axios.get("/api/albums");
        this.albums = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getSongs() {
      try {
        let response = await axios.get("/api/songs");
        this.songs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectAlbum(album) {
      this.findAlbumTitle = "";
      this.findAlbum = album;
    },
    selectSong(song) {
      this.findSongTitle = "";
      this.findSong = song;
    },
    async deleteAlbum(album) {
      try {
        await axios.delete("/api/albums/" + album._id);
        this.findAlbum = null;
        this.getAlbums();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editAlbum(album) {
      try {
        await axios.put("/api/albums/" + album._id, {
          title: this.findAlbum.title,
          artist: this.findAlbum.artist,
          year: this.findAlbum.year,
          genre: this.findAlbum.genre
        });
        this.findAlbum = null;
        this.getAlbums();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSong(song) {
      try {
        await axios.delete("/api/songs/" + song._id);
        this.findSong = null;
        this.getSongs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editSong(song) {
      try {
        await axios.put("/api/songs/" + song._id, {
          title: this.findSong.title,
          artist: this.findSong.artist,
          album: this.findSong.album
        });
        this.findSong = null;
        this.getSongs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.admin {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}

h2 {
  font-family: 'Poller One', cursive;
  font-size: 2rem;
  padding: 25px;
  text-align: center;
}

h3 {
  font-family: 'Poller One', cursive;
  font-size: 1.5rem;
  padding-bottom: 20px;
  text-align: center;
}

p {
  padding-bottom: 15px;
  text-align: center;
}

#buttonContainer {
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin: 10px auto;
}

button {
  width: 200px;
  padding: 10px;
  font-family: 'Abel', sans-serif;
  font-size: 1rem;
  background-color: #CD6133;
  border: none;
  color: white;
}

input[type=number],
input[type=text] {
  width: 100%;
  border: 2px solid #4C4942;
  padding: 10px;
  margin: 10px 0;
}

.add {
  margin: 30px auto;
  width: 50%;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.update {
  display: flex;
  justify-content: space-around;
}

.actions {
  display: flex;
  flex-direction: column;
}

.actions button {
  margin-bottom: 20px;
}

@media only screen and (max-width: 400px) {
  .add {
    width: 100%;
  }

  .update {
    flex-direction: column;
  }

  .actions {
    margin-top: 15px;
  }

  .actions button {
    width: 100%;
  }
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .add {
    width: 75%;
  }
}
</style>
