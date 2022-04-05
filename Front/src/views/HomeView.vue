<template>
    <Header/>
    <div class="auth" v-if="auth == false">
      <Signup v-if="register == false"/>
      <Login v-if="register == true"/>
    </div>
    <div class="home" v-if="auth == true">
      <WelcomeUser/>
      <div class="tchatmenu">
        <div class="tchatCard">
            <router-link to="/tchat"><img src='../assets/icon.png'></router-link>
        </div>
        <div class="tchatCard">
            <router-link to="/tchat"><img src='../assets/icon.png'></router-link>
        </div>
        <div class="tchatCard">
            <router-link to="/tchat"><img src='../assets/icon.png'></router-link>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import WelcomeUser from '@/components/WelcomeUser.vue'
import Signup from '@/components/Signup.vue'
import Login from '@/components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Header, WelcomeUser, Signup, Login
  },
  data() {
    return {
      auth: true,
      register: true
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
.tchatmenu {
    display: flex;
    flex-direction: row;
}
.tchatCard {
  margin: auto;
  width: 450px;
  background-color: #1B75BC;
}
</style>