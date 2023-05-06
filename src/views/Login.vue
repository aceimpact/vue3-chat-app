<template>
  <div class="login">
    <div class="jumbotron bg-info text-white">
      <h1 class="display-4">Vue.js Chat</h1>
      <p class="lead">Powered by Chatkit SDK and Bootstrap-Vue</p>
      <p>For more information visit website</p>
      <a class="btn btn-primary" target="_blank" href="https://pusher.com/chatkit">More Info</a>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-3"></div>
        <div class="col-lg-4 col-md-6">
          <LoginForm />
        </div>
        <div class="col-lg-4 col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login-page",
  components: {
    LoginForm,
  },
};
</script>
