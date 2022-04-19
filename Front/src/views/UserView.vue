<template>
  <Header/>
  <div class="home">
      <h1>Utilisateur</h1>
  <div class="container" v-if="mode == 'read'">
    <div class="mb-4" v-for="(Object, index) in users" :key="index">
        <div class="card text-center mb-4">
            <div class="card-header">{{ Object.lastname }} {{ Object.firstname }}</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ Object.lastname }}</li>
                <li class="list-group-item">{{ Object.firstname }}</li>
                <li class="list-group-item">{{ Object.email }}</li>
                <li class="list-group-item">Mot de passe</li>
            </ul>
        <button class="btn btn-lg btn-primary" type="button" @click="deleteAccount(Object.id)">Supprimer</button>
        </div>
    </div>
  </div>
 
  </div>
</template>



<script>
// importation de mapState et du Header
import { mapState } from 'vuex'
import Header from '@/components/Header.vue'

    export default {
    name: 'AccountView',
    components: {
        Header
    },
    data() {
        return {
            mode: 'read'
        }
    },
    methods: {
        switchToDelete() {
            this.mode = "delete"
        },
        switchToRead() {
            this.mode = "read"
        },
        deleteAccount(id) {
            this.$store.dispatch('deleteAccount', {id: id})
            this.users.splice(this.users.findIndex(i => i.id === id), 1);
        }
    },
    computed: {
        ...mapState({
            user: 'userData',
            users: 'usersData'
        })
    },
    mounted() {
        this.$store.dispatch('getAllUserData')
    },
}
</script>

<style scoped>
.home  {
    width: 80%;
  margin: auto;
    margin-bottom: 80px;
}
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
.form-control::placeholder {
            color: black;
            opacity: 0.7; 
}
</style>