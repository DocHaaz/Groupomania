<template>
    <form class="container col-5">
        <div class="card text-center mb-4">
            <div class="card-header">User</div>
            <ul class="list-group list-group-flush">
                <input type="text" class="form-control" id="floatingInput" placeholder="Lastname...">
                <input type="text" class="form-control" id="floatingInput" placeholder="Firstname...">
                <input type="text" class="form-control" id="floatingInput" placeholder="email...">
                <input type="text" class="form-control" id="floatingInput" placeholder="mot de passe...">
            </ul>
        </div>
        <div class="row justify-content-around">
            <button class="btn btn-lg btn-primary col-5" type="submit">Confirmez</button>
            <button class="btn btn-lg btn-primary col-5" type="submit">Annulez</button>
        </div>
    </form>
</template>



<script>
    export default {
    name: 'ModifyAccountView'
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
.form-control::placeholder {
            color: black;
            opacity: 0.7; 
}
</style>