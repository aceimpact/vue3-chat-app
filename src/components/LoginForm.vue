<template>
  <div class="d-flex flex-column my-16">
    <v-card elevation="2">
      <v-form ref="validForm">
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
                :rules="[requiredRules, emailRules]"
              />
            </v-col>

            <!-- パスワード -->
            <v-col cols="12" class="mb-2">
              <v-text-field
                type="password"
                v-model="state.password"
                variant="outlined"
                hide-details="auto"
                label="パスワード"
                :rules="[requiredRules]"
              />
            </v-col>

            <v-col cols="12" style="text-align: center">
              <v-btn color="indigo" depressed @click="logIn" :loading="state.logInIng"> ログイン </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { auth } from "../plugins/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

const state = reactive({
  email: "",
  password: "",
  logInIng: false,
  success: false,
});

const router = useRouter();

// バリデーション
const requiredRules = (value: any) => !!value || "必ず入力してください";
const email_pattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRules = (v: any) => !v || email_pattern.test(v) || "有効なメールアドレスではありません。";
const validForm = ref();

async function logIn() {
  try {
    const validResult = await validForm.value.validate();
    if (validResult.valid) {
      state.logInIng = true;
      await signInWithEmailAndPassword(auth, state.email, state.password);

      router.push("/chat");
    } else {
      state.success = false;
    }
  } catch (error) {
    alert(`エラー ${error}`);
  } finally {
    state.logInIng = false;
  }
}
</script>
