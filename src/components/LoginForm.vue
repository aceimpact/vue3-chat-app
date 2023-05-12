<template>
  <div class="d-flex flex-column my-16">
    <v-card elevation="2">
      <v-container>
        <v-row dense>
          <v-col>
            <v-card-title class="text-center">ログインページ</v-card-title>
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
              id="password"
              v-model="state.password"
              variant="outlined"
              hide-details="auto"
              label="パスワード"
              required
            />
          </v-col>

          <v-col cols="12" style="text-align: center">
            <v-btn color="indigo" depressed @click="logIn" :loading="state.logInIng"> ログイン </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import { auth } from "../plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

const store = useStore();

const state = reactive({
  email: "",
  password: "",
  logInIng: false,
});

const error = computed(() => store.state.error);
const loading = computed(() => store.state.loading);
const hasError = computed(() => store.getters.hasError);

const isValid = computed(() => {
  const result = state.email.length < 3;

  return result ? result : store.state.loading;
});

const router = useRouter();

async function logIn(params: any) {
  try {
    state.logInIng = true;
    const { user } = await signInWithEmailAndPassword(auth, state.email, state.password);

    router.push("/chat");
  } catch (error) {
    alert(`エラー ${error}`);
  } finally {
    state.logInIng = false;
  }
}
</script>
