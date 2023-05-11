<template>
  <div class="chat-dashboard">
    <ChatNavBar />
    <div class="container-fluid ld-over" :class="{ running: loading }">
      <div class="ld ld-ring ld-spin"></div>
      <div class="row">
        <div class="col-2">
          <RoomList />
        </div>

        <div class="col-8">
          <div class="row">
            <div class="col" id="chat-content">
              <MessageList />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <MessageForm />
            </div>
          </div>
        </div>

        <div class="col-2">
          <UserList />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import ChatNavBar from "@/components/ChatNavBar.vue";
import RoomList from "@/components/RoomList.vue";
import MessageList from "@/components/MessageList.vue";
import MessageForm from "@/components/MessageForm.vue";
import UserList from "@/components/UserList.vue";

export default defineComponent({
  name: "Chat",

  components: {
    ChatNavBar,
    RoomList,
    UserList,
    MessageList,
    MessageForm,
  },

  setup() {
    const store = useStore();

    const loading = computed(() => store.state.loading);

    return {
      loading,
    };
  },
});
</script>
