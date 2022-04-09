<template>  
<div class="container text-center">
  <form>
    <img class="mb-3" src="../assets/logo.png" alt="Groupomania logo" width="300" height="120">
    <h1 class="h3 mb-3 fw-normal">Inscription</h1>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Nom</label>
        <input type="text" class="form-control" id="floatingInput" placeholder="Nom">
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Prénom</label>
        <input type="text" class="form-control" id="floatingInput" placeholder="Prénom">
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingInput">Adresse Email</label>
        <input type="email" class="form-control" id="floatingInput" placeholder="nom@example.com">
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="text-start col-4 mb-3">
        <label for="floatingPassword">Mots de passe</label>
        <input type="password" class="form-control" id="floatingPassword" placeholder="Mots de passe">
        </div>
    </div>
    <button class="btn btn-lg btn-primary col-4" type="submit">S'inscrire</button>
    <p class="mt-5 mb-3 text-muted">Groupomania</p>
  </form>
</div>
</template>

<script>
    export default {
    name: 'SignupView'
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