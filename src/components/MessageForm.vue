<template>
  <div class="message-form ld-over">
    <small class="text-muted">{{ user.username }}</small>
    <form @submit.prevent="onSubmit" class="ld-over" :class="{ running: sending }">
      <div class="ld ld-ring ld-spin"></div>
      <div class="alert alert-danger" role="alert" v-if="hasError">
        {{ error }}
      </div>
      <div class="form-group">
        <input
          id="message-input"
          type="text"
          class="form-control"
          v-model="message"
          placeholder="Enter Message"
          autocomplete="off"
          required
        />
      </div>
      <div class="clearfix">
        <button type="submit" class="btn btn-primary float-end">Send</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "MessageForm",

  setup() {
    const store = useStore();

    const message = ref("");

    const user = computed(() => store.state.user);
    const sending = computed(() => store.state.sending);
    const error = computed(() => store.state.error);
    const activeRoom = computed(() => store.state.activeRoom);

    const hasError = computed(() => store.getters.hasError);

    return {
      message,
      user,
      sending,
      error,
      activeRoom,
      hasError,
    };
  },
};
</script>
