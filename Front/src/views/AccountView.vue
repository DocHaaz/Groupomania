<template>
  <Header/>
    <h1 class="col-8">Compte de {{ user.firstname }} </h1>
    <form class="container col-5" v-if="ask == 'none'">
        <div class="card text-center mb-4">
            <div class="card-header">{{ user.lastname }} {{ user.firstname }}</div>
            <ul class="list-group list-group-flush" v-if="mode == 'update'">
                <input type="text" class="form-control" v-model="lastname" placeholder="Lastname...">
                <input type="text" class="form-control" v-model="firstname" placeholder="Firstname...">
                <input type="text" class="form-control" v-model="email" placeholder="email...">
                <input type="text" class="form-control" v-model="password" placeholder="mot de passe...">
            </ul>
            <ul class="list-group list-group-flush" v-else>
                <li class="list-group-item">{{ user.lastname }}</li>
                <li class="list-group-item">{{ user.firstname }}</li>
                <li class="list-group-item">{{ user.email }}</li>
                <li class="list-group-item">Mot de passe</li>
            </ul>
        </div>
        <div class="row justify-content-around" v-if="mode == 'update'">
            <button class="btn btn-lg btn-primary col-5" type="button" @click="modifyAccount(), switchToRead()">Confirmez</button>
            <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToRead()">Annulez</button>
        </div>
        <div class="row justify-content-around" v-else>
            <button class="btn btn-lg btn-primary col-5" type="submit" @click="switchToUpdate()">Modifier</button>
            <button class="btn btn-lg btn-primary col-5" type="button" @click="askToDelete()">Supprimer</button>
        </div>
    </form>
    <div class="" tabindex="-1" role="dialog" v-if="ask == 'ask'">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Supprimer mon compte</h5>
                </div>
                <div class="modal-body">
                <p>êtes vous sur de vouloir supprimer le compte de {{ user.firstname}} </p>
                </div>
                <div class="modal-footer">
            <button class="btn btn-lg btn-primary col-5" type="button" @click="deleteAccount(user.id)">Confirmez</button>
            <button class="btn btn-lg btn-primary col-5" type="submit" @click="askToRead()">Annulez</button>
                </div>
            </div>
        </div>
    </div>

</template>



<script>
import { mapState } from 'vuex'

import Header from '@/components/Header.vue'

    export default {
    name: 'AccountView',
    components: {
        Header
    },
    data() {
        return {
            mode: 'read',
            ask: 'none',
        }
    },
    methods: {
        switchToUpdate() {
            this.mode = 'update'
        },
        switchToRead() {
            this.mode = 'read'
        },
        askToDelete() {
            this.ask = "ask"
        },
        askToRead() {
            this.ask = "none"
        },
        modifyAccount() {
            this.$store.dispatch('modifyAccount', {
                lastname: this.lastname,
                firstname: this.firstname,
                email: this.email,
                password: this.password
            }).then(res => {
                console.log(res)
            }).catch(error => console.log(error))
        },
        deleteAccount(id) {
            this.$router.push('/')
            this.$store.dispatch('deleteAccount',  {id: id})
        }
    },
    computed: {
        ...mapState({
            user: 'userData'
        })
    },
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
.form-control::placeholder {
            color: black;
            opacity: 0.7; 
}
</style>