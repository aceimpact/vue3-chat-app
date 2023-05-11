<template>
  <div class="room-list">
    <h4>Channels</h4>
    <hr />
    <ul class="list-group" v-if="activeRoom">
      <li
        class="list-group-item"
        v-for="room in rooms"
        :key="room.name"
        :class="{ active: activeRoom.id === room.id }"
        @click="onChange(room)"
      >
        # {{ room.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "RoomList",

  setup() {
    const store = useStore();

    const rooms = computed(() => store.state.rooms);
    const activeRoom = computed(() => store.state.activeRoom);

    return {
      rooms,
      activeRoom,
    };
  },
};
</script>
