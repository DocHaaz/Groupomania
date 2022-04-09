<template>
    <div class="auth" v-if="auth == false">
      <Signup v-if="register == false"/>
      <Login v-if="register == true"/>
    </div>
    <div class="home" v-if="auth == true">
      <Header/>
      <h1>Bonjour {{ name }}, </h1>
      <div class="container card_container">
        <div class="card">
          <h5 class="card-header">Titre</h5>
          <div class="card-body">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <p class="blockquote-footer">name - date</p>
            <router-link to="/post" class="nav-link stretched-link"></router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Header, Signup, Login
  },
  data() {
    return {
      auth: true,
      register: true,
      name: "Arthur"
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 120px;
}

.card_container {
  margin-bottom: 40px;
}

</style>