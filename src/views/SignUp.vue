<template>
  <div>
    <v-container>
      <div>
        <SignUpForm />
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import SignUpForm from "@/components/SignUpForm.vue";
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
