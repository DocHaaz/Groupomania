<template>

    <form action="/ma-page-de-traitement" method="post">
        <div>
            <label for="lastname">Nom :</label>
            <input type="text" name="lastname">
        </div>
                <div>
            <label for="password">Mot de passe :</label>
            <input type="text" name="lastname">
        </div>
      </form>
      <div class="button">
        <button type="submit">Envoyer le message</button>
      </div>
</template>

<script>
    export default {
    name: 'LoginView'
    }
</script>