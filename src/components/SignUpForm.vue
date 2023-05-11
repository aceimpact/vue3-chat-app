<template>
  <div class="signup-form">
    <v-container>
      <h5 class="text-center">サインアップページ</h5>
      <hr />
      <v-form @submit.prevent="singUp">
        <v-col cols="12" class="mb-3">
          <label for="userInput" class="form-label">ユーザー名</label>
          <v-text-field v-model="state.name" variant="outlined" hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="12" class="mb-3">
          <label for="userInput" class="form-label">メールアドレス</label>
          <v-text-field
            v-model="state.email"
            id="userInput"
            variant="outlined"
            hide-details="auto"
            placeholder="Enter Email"
            autocomplete="off"
            :disabled="loading"
            required
          />
        </v-col>
        <v-col cols="12" class="mb-3">
          <label for="password" class="form-label">パスワード</label>
          <v-text-field
            id="password"
            v-model="state.password"
            variant="outlined"
            hide-details="auto"
            placeholder="Enter password"
            autocomplete="off"
            :disabled="loading"
            required
          />
        </v-col>
        <v-btn color="indigo" :disabled="isValid" @click="singUp" :loading="state.creating"> サインアップ </v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex";

import { auth, db } from "../plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "signup-form",

  setup() {
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

    return {
      state,
      isValid,
      singUp,
      loading,
      error,
      hasError,
    };
  },
});
</script>
