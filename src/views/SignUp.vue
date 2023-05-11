<template>
  <div class="login">
    <div class="jumbotron bg-info text-white p-5">
      <h1>Vue.js Chat</h1>

      <nav>
        <router-link to="/chat">Home</router-link> | <router-link to="/signup">サインアップ</router-link> |
        <router-link to="/">ログイン</router-link>
      </nav>
    </div>
    <v-container>
      <div>
        <SignUpForm />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "login-page",
  components: {
    SignUpForm,
  },
};
</script>

<style lang="scss">
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}

nav nav a.router-link-exact-active {
  color: #42b983;
}
</style>
