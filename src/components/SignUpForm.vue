<template>
  <div class="my-16">
    <v-card elevation="2">
      <v-container>
        <v-row dense>
          <v-col>
            <v-card-title class="text-center"> サインアップページ </v-card-title>
          </v-col>

          <!-- ユーザー名 -->
          <v-col cols="12" class="mb-2">
            <v-text-field v-model="state.name" variant="outlined" hide-details="auto" label="ユーザー名"></v-text-field>
          </v-col>

          <!-- メールアドレス -->
          <v-col cols="12" class="mb-2">
            <v-text-field
              v-model="state.email"
              variant="outlined"
              hide-details="auto"
              label="メールアドレス"
              required
            />
          </v-col>

          <!-- パスワード -->
          <v-col cols="12" class="mb-2">
            <v-text-field
              v-model="state.password"
              variant="outlined"
              hide-details="auto"
              label="メールアドレス"
              required
            />
          </v-col>

          <v-col cols="12" style="text-align: center">
            <v-btn color="indigo" depressed @click="singUp" :loading="state.creating"> サインアップ </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import { auth, db } from "../plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

const store = useStore();

const state = reactive({
  name: "",
  email: "",
  password: "",
  creating: false,
});

const error = computed(() => store.state.error);
const loading = computed(() => store.state.loading);
const hasError = computed(() => store.getters.hasError);

const isValid = computed(() => {
  const result = state.email.length < 3;

  return result ? result : store.state.loading;
});

const router = useRouter();

async function singUp(value: any) {
  try {
    state.creating = true;
    const { user } = await createUserWithEmailAndPassword(auth, state.email, state.password);
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      name: state.name,
      email: state.email,
    });
    router.push("/");
  } catch (error) {
    alert(`エラー ${error}`);
  } finally {
    state.creating = false;
  }
}
</script>
