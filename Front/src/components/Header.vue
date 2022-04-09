<template>
  <nav class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
    <router-link to="/"><img alt="Logo de Groupomania" src="../assets/logo.png"></router-link>
      <ul class="nav nav-pills">
        <li class="nav-item"><router-link to="/" class="nav-link">Accueil</router-link></li>
        <li class="nav-item"><router-link to="/user" class="nav-link">Mon Compte</router-link></li>
        <li class="nav-item"><router-link to="/disconnect" class="nav-link">Déconnexion</router-link></li>
      </ul>
    </header>
  </nav>
</template>

<script>
export default {
  name: 'HeaderView'
}
</script>

<style scoped>
nav {
  margin-bottom: 120px;
}

.header {
  display: flex;
  align-items: top;
  justify-content: space-between;
  margin-bottom: 120px;
}

img {
  width: 500px;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: #1B75BC;
}

nav a.router-link-exact-active {
  background-color: #FF4019;
  color: #FFFF;
}

.navButton {
  padding: 14px;
  border-radius: 12px;
  background-color: #1B75BC;
}
</style>
