<template>
  <div id="app">
    <div id="content">
      <div id="header">
        <h1>My Music Library</h1>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/albums">Albums</router-link>
        <router-link to="/songs">Songs</router-link>
      </div>
      <router-view />
    </div>
    <div id="footer">
      <router-link to="/admin">Admin</router-link>
      <a href="https://github.com/allison-baker/creative-project-4" target="_blank">
        Github Repository</a>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Abel', sans-serif;
  font-size: 18px;
  text-align: center;
  color: #4C4942;
  position: relative;
  min-height: 100vh;
}

#header {
  padding: 50px;
  background-color: #F4ECC5;
}

h1 {
  font-family: 'Poller One', cursive;
  font-size: 3rem;
}

#nav {
  padding: 20px;
  display: flex;
  justify-content: space-around;
  background-color: #F4ECC5;
}

a {
  font-weight: bold;
  color: #4C4942;
  text-decoration: none;
  font-size: 1.2rem;
}

a.router-link-exact-active {
  color: #CD6133;
}

#content {
  padding-bottom: 75px;
}

#footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75px;
  background-color: #F4ECC5;
}
</style>
