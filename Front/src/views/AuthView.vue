<template>  
<div class="container text-center">
  <form>
    <img class="mb-3" src="../assets/logo.png" alt="Groupomania logo" width="300" height="120">
    <h1 class="h3 mb-3 fw-normal" v-if="mode == 'login'">Connexion</h1>
    <h1 class="h3 mb-3 fw-normal" v-else>Inscription</h1>
    <div class="row justify-content-center " v-if="mode == 'create'">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Nom</label>
        <input type="text" class="form-control" v-model="Lastname" placeholder="Nom">
        </div>
    </div>
    <div class="row justify-content-center" v-if="mode == 'create'">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Prénom</label>
        <input type="text" class="form-control" v-model="Firstname" placeholder="Prénom">
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Adresse Email</label>
        <input type="email" class="form-control" v-model="email" placeholder="nom@example.com">
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingPassword">Mots de passe</label>
        <input type="password" class="form-control" v-model="password" placeholder="Mots de passe">
        </div>
    </div>
    <button class="btn btn-lg btn-primary col-4 mb-3" @click="loginAccount()" type="button" v-if="mode == 'login'">Se connecter</button>
    <button class="btn btn-lg btn-primary col-4 mb-3"  @click="createAccount()" type="button" v-else>S'inscrire</button>
    <div class="link-primary mb-3"  @click="switchToCreate()" v-if="mode == 'login'">Vous n'avez pas encore de Compte</div>
    <div class="link-primary mb-3" @click="switchToLogin()" v-else>Vous avez déjà un Compte</div>
    <div class="alert alert-danger col" role="alert" v-if="mode == 'login' && status == 'error_login'">Adresse mail ou mot de passe incorrect</div>
    <div class="alert alert-danger col" role="alert" v-if="mode == 'create' && status == 'error_create'">Formulaire incomplet ou adresse mail déjà utilisez</div>
  </form>
</div>
</template>

<script>
import { mapState } from 'vuex'

    export default {
    name: 'AuthView',
    data() {
        return {
            mode: 'login',
            lastname: '',
            firstname: '',
            email: '',
            password: ''
        }
    },
    methods: {
        switchToCreate() {
            this.mode = 'create';
        },
        switchToLogin() {
            this.mode = 'login';
        },
        loginAccount() {
            this.$store.dispatch('loginAccount', {
                email: this.email,
                password: this.password
            }).then(res => {
              console.log(res)
              this.$router.push('/home')
              })
            .catch(error => console.log(error))
        },
        createAccount() {
            this.$store.dispatch('createAccount', {
                lastname: this.Lastname,
                firstname: this.Firstname,
                email: this.email,
                password: this.password
            }).then(res => {
              console.log(res)
              this.loginAccount()
              })
            .catch(error => console.log(error));
        },
    },
    computed: {
        ...mapState(['status'])
    },
    mounted: function() {
        console.log(localStorage.getItem('user'))
      if(this.$store.state.user.id == -1) {
          this.$router.push('/')
          return;
      }
    },
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