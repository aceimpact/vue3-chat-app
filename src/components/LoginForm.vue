<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr />
    <form @submit.prevent="onSubmit">
      <div class="alert alert-danger" role="alert" v-if="hasError">{{ error }}</div>
      <div class="mb-3">
        <label for="userInput" class="form-label">User Name</label>
        <input
          id="userInput"
          type="text"
          class="form-control"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary ld-ext-right" :class="{ running: loading }" :disabled="isValid">
        Login
        <div class="ld ld-ring ld-spin"></div>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "login-form",

  setup() {
    const store = useStore();

    const userId = ref("");

    const error = computed(() => store.state.error);
    const loading = computed(() => store.state.loading);
    const hasError = computed(() => store.getters.hasError);

    const isValid = computed(() => {
      const result = userId.value.length < 3;

      return result ? result : store.state.loading;
    });

    const onSubmit = (event) => {
      event.preventDefault();
    };

    return {
      userId,
      isValid,
      onSubmit,
      loading,
      error,
      hasError,
    };
  },
});
</script>
