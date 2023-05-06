<template>
  <nav id="chat-navbar" class="navbar navbar-expand-md navbar-dark bg-info">
    <a class="navbar-brand" href="#"> Vue Chat </a>
    <div class="navbar-nav ml-auto">
      <span class="navbar-text">{{ user.name }} | </span>
      <a class="nav-link active" href="#">Logout</a>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from "vue";
import { mapState } from "vuex";

export default {
  name: "ChatNavBar",
  setup() {
    const { user } = mapState(["user"]);

    return {
      user,
    };
  },
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>
