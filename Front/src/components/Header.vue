<template>
  <nav class="test">
    <header class="d-flex justify-content-between align-items-center py-3">
    <router-link to="/home"><img alt="Logo de Groupomania" src="../assets/logo.png" class="col-xs"></router-link>
      <ul class="nav nav-pills mx-4">
        <li class="nav-item"><router-link to="/home" class="nav-link">Accueil</router-link></li>
        <li class="nav-item"><router-link :to="`/user/${ user.id }`" class="nav-link">Mon Compte</router-link></li>
        <li class="nav-item" v-bind:hidden="!user.admin"><router-link to="/user" class="nav-link">Utilisateur</router-link></li>
        <li class="nav-item nav-item-danger"><router-link to="/" @click="logoff()" class="nav-link">Déconnexion</router-link></li>
      </ul>
    </header>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderView',
  data() {
    return {
      mode: '1',
    }
  },
  computed: {
    ...mapState({
      user: 'userData'
    })
  },
  methods: {
    logoff() {
    this.$store.commit('logoff')
    }
  },
  async mounted() {
      if(this.$store.state.user.id == -1) {
          this.$router.push('/')
          return;
      }
    this.user = await this.$store.dispatch('getUserData', { id: this.user.id})
    },
}
</script>

<style scoped>
.test {
  width: initial;
}
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
  width: 450px;
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

.nav-item-danger {
  border: 1px solid #FF4019;
  border-radius: 8px;
  margin-left: 10px;
}

@media screen and (max-width: 992px) {
  img {
    width: 300px;
  }
}

@media screen and (max-width: 577px) {
  img {
    width: 200px;
  }
}
</style>
