<template>
  <div class="home">
    <router-link to="/"><img alt="Logo de Groupomania" src="../assets/logo.png"></router-link>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/user">Mon Compte</router-link> |
      <button class="logoff__button" @click="logoff">Déconnection</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderView'
}
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

img {
  width: 500px;
}

nav {
  margin-right: 5%;
}

nav a {
  font-weight: bold;
  color: #1B75BC;
}

nav a.router-link-exact-active {
  color: #FD2D01;
}

.logoff__button {
  color: #FD2D01;
}
</style>
