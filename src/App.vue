<template>
  <nav
    class="navbar navbar-dark bg-dark navbar-expand-lg d-flex justify-content-around"
  >
    <router-link to="/" style="text-decoration: none"> Home </router-link>
    <router-link to="/history" style="text-decoration: none">
      History
    </router-link>
  </nav>
  <div class="d-flex justify-content-center align-items-center">
    <div class="container m-5">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #368be0;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
