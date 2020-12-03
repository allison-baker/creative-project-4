<template>
  <div class="home">
    <div id="images">
      <img src="../../public/images/notes.png" class="notes"/>
      <img src="../../public/images/profile_pic.png" id="profile"/>
      <img src="../../public/images/notes.png" class="notes"/>
    </div>
    <h2>Allison's Music Library</h2>
    <div id="content">
      <div class="column">
        <h3>Favorite Genres</h3>
        <ul v-if="albumsExist">
          <li v-for="genre in genres" :key="genre">
            {{genre}}
          </li>
        </ul>
        <p v-else>Looks like you haven't added any albums yet! Add some to see your
          favorite genres listed here.</p>
      </div>
      <div class="column">
        <h3>Favorite Artists</h3>
        <ul v-if="albumsExist">
          <li v-for="artist in artists" :key="artist">
            {{artist}}
          </li>
        </ul>
        <p v-else>Looks like you haven't added any albums yet! Add some to see your
          favorite artists listed here.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Home",
  data() {
    return {
      albums: [],
      albumsExist: false,
    }
  },
  computed: {
    genres() {
      let toFilter = this.albums;
      let genres = [];
      for (let i=0; i < toFilter.length; i++) {
        for (let j=i+1; j < toFilter.length; j++) {
            // If a[i] is found later in the array
            if (toFilter[i].genre === toFilter[j].genre)
              j = ++i;
        }
        genres.push(toFilter[i].genre);
      }
      return genres;
    },
    artists() {
      let toFilter = this.albums;
      let artists = [];
      for (let i=0; i < toFilter.length; i++) {
        for (let j=i+1; j < toFilter.length; j++) {
            // If a[i] is found later in the array
            if (toFilter[i].artist === toFilter[j].artist)
              j = ++i;
        }
        artists.push(toFilter[i].artist);
      }
      return artists;
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
  },
};
</script>

<style scoped>
.home {
  width: 80%;
  margin: 0 auto;
}

h2 {
  font-family: 'Poller One', cursive;
  font-size: 2rem;
}

h3 {
  font-family: 'Poller One', cursive;
  font-size: 1.5rem;
  padding-bottom: 20px;
}

#images {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 300px;
  margin: 50px 0;
}

.notes {
  height: 50%;
  margin: auto 0;
}

#profile {
  height: 100%;
}

#content {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 30px 0;
}

.column {
  width: 50%;
  padding: 0 15px;
}

li {
  display: block;
}

@media only screen and (max-width: 400px) {
  .home {
    width: 100%;
  }

  #images {
    height: 200px;
    margin: 40px 0;
  }

  .notes {
    display: none;
  }

  #content {
    flex-direction: column;
  }

  .column {
    width: 80%;
    margin: 0 auto;
    padding: 15px 0;
  }
}

@media only screen and (min-width: 401px) and (max-width: 960px) {
  .home {
    width: 100%;
  }

  #images {
    height: 250px;
  }

  .notes {
    height: 40%;
  }
}
</style>
