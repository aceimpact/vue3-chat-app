<template>
  <div class="user-list">
    <h4>Members</h4>
    <hr />
    <ul class="list-group">
      <li class="list-group-item" v-for="user in users" :key="user.username">
        {{ user.name }}
        <span v-if="user.presence" :class="['badge', statusColor(user.presence)]" aria-label="status">
          {{ user.presence }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "UserList",

  setup() {
    const store = useStore();

    const loading = computed(() => store.state.loading);
    const users = computed(() => store.state.users);

    const statusColor = (status) => {
      console.log(status);
      return status == "online" ? "bg-success" : "bg-warning";
    };

    return {
      loading,
      users,
      statusColor,
    };
  },
  methods: {
    // その他のメソッドがあればここに記述します
  },
};
</script>
