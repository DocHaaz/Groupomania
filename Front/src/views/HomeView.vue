<template>
    <Header/>
    <div class="home">
      <h1 v-if="mode == 'read'">Bonjour {{ user.firstname }}, </h1>
      <div class="container card_container" v-if="mode == 'read'">
        <div class="card mb-5" v-for="(Object, index) in posts" :key="index">
          <h5 class="card-header">{{ Object.post_text }}</h5>
          <div class="card-body">
            <p class="card-text">{{ Object.post_text }}</p>
            <p class="blockquote-footer">{{ Object.id }} - Créé le {{ Object.created_at }}</p>
            <router-link :to="`/post/${ Object.id }`" class="nav-link stretched-link"></router-link>
          </div>
        </div>
      </div>
      <div class="container text-center">
        <button class="btn btn-lg btn-primary col-5" type="button" v-if="mode == 'read'" @click="switchToCreate()">Nouveau post</button>
      </div>
    </div>
    <div class="text-center" tabindex="-1" role="dialog" v-if="mode == 'create'">
      <div class="container card_container">
        <div class="card">
          <input type="text" class="form-control" v-model="title" placeholder="Titre">
          <div class="card-body">
            <input type="text" class="form-control" v-model="text" placeholder="Texte">
          </div>
        </div>
      </div>
      <div class="row justify-content-around">
        <button class="btn btn-lg btn-primary col-4" type="button" @click="createPost()">Confirmez</button>
        <button class="btn btn-lg btn-primary col-4" type="submit" @click="switchToRead()">Annulez</button>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  components: {
    Header
  },
  data() {
    return {
      mode: 'read',
    }
  },
  methods : {
    switchToCreate() {
      this.mode = 'create'
    },
    switchToRead() {
      this.mode = 'read'
    },
    createPost() {
      this.$store.dispatch('createPost', {
        userid: this.user.id,
        post_title: this.text,
        post_text: this.text
      }).then(res => {
          console.log(res)
          this.$router.go()
        })
        .catch(error => console.log(error))
    },
  },
  computed: {
    ...mapState({
      user: 'userData',
      users: 'usersData',
      posts: 'postsData'
    })
  },
  mounted() {
    if(this.$store.state.user.id == -1) {
      this.$router.push('/')
      return;
    }
    this.$store.dispatch('getPostData')
    this.$store.dispatch('getAllUserData')
  },
}
</script>

<style scoped>
.home  {
    width: 80%;
  margin: auto;
}
h1 {
  margin-bottom: 120px;
}

.card_container {
  margin-bottom: 40px;
}

</style>

