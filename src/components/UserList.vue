<template>
  <v-card>
    <v-list>
      <v-list-item v-for="(item, index) in filterUsers" :key="index" @click="goToRoom(item.id)">
        <v-list-item-title class="text-start">{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted, defineProps, defineEmits } from "vue";

import { db } from "../plugins/firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface Props {
  userId: String;
}

const props = defineProps<Props>();

interface Emits {
  (e: "goToChatRoom", value: string): void;
}

const emit = defineEmits<Emits>();

const state = reactive({
  users: [] as Array<any>,
});

const filterUsers = computed(() => {
  return state.users.filter((item: any) => item.id !== props.userId);
});

const goToRoom = (status: string) => {
  emit("goToChatRoom", status);
};

function setUsers() {
  const collectionRef = collection(db, "users");
  onSnapshot(collectionRef, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      state.users.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
      });
    });
  });
}

onMounted(async () => {
  setUsers();
});
</script>
