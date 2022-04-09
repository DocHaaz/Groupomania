<template>
    <Header/>
    <div class="container mb-5 card_container">
      <div class="card">
        <h5 class="card-header">Titre</h5>
        <div class="card-body">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
    </div>
    <div class="container card_container">
      <div class="card">
        <div class="card-body">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        </div>
      </div>
    </div>
    <div class="row mb-5"></div>
    <div class="container col-8 text-center">
      <input type="text" class="form-control mb-3" id="floatingInput" placeholder="Ecrivez votre message...">
      <button class="btn btn-lg btn-primary col-4" type="submit">Envoyez</button>
    </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
button{
    background-color: #1B75BC;
    border: 0px;
}
button:hover {
    background-color: #FF4019;
}
</style>