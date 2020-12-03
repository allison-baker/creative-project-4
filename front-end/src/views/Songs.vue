<template>
  <div id="songs">
    <h2>Allison's Favorite Songs</h2>
    <div v-if="songsExist" id="grid">
      <div class="song" v-for="song in songs" :key="song.id">
        <h3>{{song.title}}</h3>
        <p>{{song.artist}}</p>
        <p>{{song.album}}</p>
        <img :src="song.path"/>
      </div>
    </div>
    <p v-else>It looks like you haven't added any songs yet. Add some on the
      Admin page so you can see them here in a nice pretty grid!</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Songs",
  data() {
    return {
      songs: [],
      songsExist: false,
    }
  },
  created() {
    this.getSongs();
  },
  methods: {
    async getSongs() {
      try {
        let response = await axios.get("/api/songs");
        this.songs = response.data;
        if (this.songs.length === 0) {
          this.songsExist = false;
        } else this.songsExist = true;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
#songs {
  width: 80%;
  margin: 0 auto;
}

h2 {
  font-family: 'Poller One', cursive;
  font-size: 2rem;
  padding: 30px;
}

h3 {
  font-family: 'Poller One', cursive;
  font-size: 1.5rem;
  padding-bottom: 10px;
}

p {
  padding-bottom: 10px;
}

#grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.song {
  width: 23%;
  margin-bottom: 30px;
}

img {
  width: 100%;
}

@media only screen and (max-width: 400px) {
  #grid {
    flex-direction: column;
  }

  .song {
    width: 100%;
    margin: 15px 0;
  }
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .song {
    width: 48%;
  }
}
</style>
