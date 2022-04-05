<template>
    <form action="/ma-page-de-traitement" method="post">
        <div>
            <label for="lastname">Nom :</label>
            <input type="text" name="lastname">
        </div>
        <div>
            <label for="firstname">Prénom :</label>
            <input type="text" name="lastname">
        </div>
                <div>
            <label for="password">Mot de passe :</label>
            <input type="text" name="lastname">
        </div>
        <div>
            <label for="mail">e-mail :</label>
            <input type="email" name="user_mail">
        </div>
        <div>
            <label for="birth">e-mail :</label>
            <input type="date" name="user_birthdate">
        </div>
        <div>
            <label for="department">department :</label>
            <input type="text" name="user_department">
        </div>
      </form>
      <div class="button">
        <button type="submit">Envoyer le message</button>
      </div>
</template>

<script>
    export default {
    name: 'SignupView'
    }
</script>