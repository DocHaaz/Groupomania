<template>
    <Header/>
    <h1>Compte de {{ user }} </h1>
    <ul>
        <li>nom</li>
        <li>prénom</li>
        <li>date de naissance</li>
        <li>mail</li>
        <li>département</li>
    </ul>
    <button>Supprimer</button>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  data() {
      return {
          user: "Arthur"
      }
  }
}
</script>