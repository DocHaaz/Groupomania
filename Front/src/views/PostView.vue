<template>
    <Header/>
    <div class="home">
    <div class="container mb-5 card_container" v-if="postMode == 'postUpdate'">
      <div class="card">
        <input type="text" class="form-control" v-model="Lastname" placeholder="Titre">
        <div class="card-body">
          <input type="text" class="form-control mb-4" v-model="post_text" placeholder="Texte">
        <div class="row justify-content-around" >
            <button class="btn btn-lg btn-primary col-5" type="button" @click="modifyPost()">Confirmez</button>
            <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToPostRead()">Annulez</button>
        </div>
        </div>
      </div>
    </div>
        <div class="container mb-5 card_container" v-if="postMode == 'postRead'">
      <div class="card">
        <h5 class="card-header">{{post.post_text}}</h5>
        <div class="card-body">
          <p class="card-text">{{post.post_text}}</p>
          <p class="blockquote-footer">{{post.id}} - {{post.created_at}} </p>
        <div class="row justify-content-around">
            <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToPostUpdate()">Modifier</button>
            <button class="btn btn-lg btn-primary col-5" type="button" @click="deletePost(post.id)">Supprimer</button>
        </div>
        </div>
      </div>
    </div>
    <div class="container mb-4" v-for="(Object, index) in message" :key="index">
      <div class="container card_container" v-if="messageMode == 'messageUpdate'">
        <div class="card">
          <div class="card-body">
            <input type="text" class="form-control  mb-4" v-model="message_text" placeholder="Texte">
          <div class="row justify-content-around">
              <button class="btn btn-lg btn-primary col-5" type="button" @click="modifyMessage(Object.id)">Confirmez</button>
              <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToMessageRead()">Annulez</button>
          </div>
          </div>
        </div>
      </div>
      <div class="container card_container" v-if="messageMode == 'messageRead'">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{Object.message_text}}</p>
            <p class="blockquote-footer">{{Object.id}} {{index}} - </p>
          <div class="row justify-content-around">
              <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToMessageUpdate()">Modifier</button>
              <button class="btn btn-lg btn-primary col-5" type="button" @click="deleteMessage(Object.id)">Supprimer</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5"></div>
    <div class="container col-8 text-center">
      <input type="text" class="form-control mb-3" v-model="text" placeholder="Ecrivez votre message...">
      <button class="btn btn-lg btn-primary col-4" @click="createMessage()" type="button">Envoyez</button>
    </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      post: Object,
      message: Object,
      post_text: '',
      message_text: '',
      text: '',
      postMode: 'postRead',
      messageMode: 'messageRead'
    }
  },
  components: {
    Header
  },
  methods: {
    switchToPostUpdate() {
      this.postMode = 'postUpdate'
    },
    switchToPostRead() {
      this.postMode = 'postRead'
    },
    switchToMessageUpdate() {
      this.messageMode = 'messageUpdate'
    },
    switchToMessageRead() {
      this.messageMode = 'messageRead'
    },
    modifyPost() {
      this.$store.dispatch('modifyPost', {
        id: this.post.id,
        post_title: this.post_title,
        post_text: this.post_text
        }).then(res => {
          console.log(res)
          this.$router.go()
        }).catch(error => console.log(error))
    },
    deletePost(id) {
      this.$router.push('/home')
      this.$store.dispatch('deletePost',  {id: id})
    },
    createMessage() {
      this.$store.dispatch('createMessage', {
        userid: this.user.id,
        post_id: this.post.id,
        message_text: this.text
      }).then(res => {
          console.log(res)
          this.message.push(res.data)
        })
        .catch(error => console.log(error))
    },
    modifyMessage(test) {
      this.$store.dispatch('modifyMessage', {
        id: test,
        message_text: this.message_text
        }).then(res => {
          console.log(res)
          this.$router.go()
        }).catch(error => console.log(error))
    },
    async deleteMessage(id) {
      await this.$store.dispatch('deleteMessage',  {id: id})
      this.message.splice(this.message.findIndex(i => i.id === id), 1);
    }
  },
    async mounted() {
    // this.$store.dispatch('getMessageData', { id: this.$route.params.id})
    this.post = await this.$store.dispatch('getOnePost', { id: this.$route.params.id})
    this.message = await this.$store.dispatch('getMessageData', { id: this.$route.params.id})
  },
  computed: {
    ...mapState({
      user: 'userData'
    })
  },
}
</script>

<style scoped>
.home  {
    width: 80%;
  margin: auto;
}
button{
    background-color: #1B75BC;
    border: 0px;
}
button:hover {
    background-color: #FF4019;
}
</style>