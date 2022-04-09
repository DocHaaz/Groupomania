<template>
    <div class="container col-5">
        <div class="card mb-4">
            <div class="card-header text-center">User</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Lastname</li>
                <li class="list-group-item">Firstname</li>
                <li class="list-group-item">email</li>
                <li class="list-group-item">Mot de passe</li>
            </ul>
        </div>
        <div class="row justify-content-around">
            <button class="btn btn-lg btn-primary col-5" type="submit">Modifier</button>
            <button class="btn btn-lg btn-primary col-5" type="submit">Supprimer</button>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'AccountView'
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