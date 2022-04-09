<template>
  <Header/>
  <h1 class="col-8">Compte de {{ user }} </h1>
  <Account v-if="test == true"/>
  <ModifyAccount v-if="test == false" />
</template>

<script>
import Header from '@/components/Header.vue'
import Account from '@/components/Account.vue'
import ModifyAccount from '@/components/ModifyAccount.vue'

export default {
  name: 'HomeView',
  components: {
    Header, Account, ModifyAccount
  },
  data() {
      return {
          user: "Arthur",
          test: true
      }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 120px;
}
button{
    background-color: #1B75BC;
    border: 0px;
}
button:hover {
    background-color: #FF4019;
}
</style>