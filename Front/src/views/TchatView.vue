<template>
    <Header/>
    <div>
      <p> {{ message }} </p>
    </div>
        <div>
            <label for="msg">Message :</label>
            <textarea name="user_message"></textarea>
        </div>
</template>


<script>
import Header from '@/components/Header.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
input {
  width: 400px;
  height: 150px;
}
</style>