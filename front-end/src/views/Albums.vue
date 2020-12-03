<template>
  <div id="albums">
    <h2>Allison's Favorite Albums</h2>
    <div v-if="albumsExist" id="grid">
      <div class="album" v-for="album in albums" :key="album.id">
        <h3>{{album.title}}</h3>
        <p>{{album.artist}}</p>
        <p>{{album.year}}</p>
        <p>{{album.genre}}</p>
        <img :src="album.path"/>
      </div>
    </div>
    <p v-else>It looks like you haven't added any albums yet. Add some on the
      Admin page so you can see them here in a nice pretty grid!</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Albums",
  data() {
    return {
      albums: [],
      albumsExist: false,
    }
  },
  created() {
    this.getAlbums();
  },
  methods: {
    async getAlbums() {
      try {
        let response = await axios.get("/api/albums");
        this.albums = response.data;
        if (this.albums.length === 0) {
          this.albumsExist = false;
        } else this.albumsExist = true;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
#albums {
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

.album {
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

  .album {
    width: 100%;
    margin: 15px 0;
  }
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .album {
    width: 48%;
  }
}
</style>
