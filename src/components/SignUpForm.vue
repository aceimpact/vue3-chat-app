<template>
  <div class="my-16">
    <v-card elevation="2">
      <v-form ref="validForm">
        <v-container>
          <v-row dense>
            <v-col>
              <v-card-title class="text-center"> サインアップページ </v-card-title>
            </v-col>

            <!-- ユーザー名 -->
            <v-col cols="12" class="mb-2">
              <v-text-field
                v-model="state.name"
                variant="outlined"
                hide-details="auto"
                label="ユーザー名"
                :rules="[requiredRules]"
              ></v-text-field>
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
              <v-btn color="indigo" depressed @click="singUp" :loading="state.creating"> サインアップ </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { auth, db } from "../plugins/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { useRouter } from "vue-router";

const state = reactive({
  name: "",
  email: "",
  password: "",
  creating: false,
  success: false,
});

const router = useRouter();

// バリデーション
const requiredRules = (value: any) => !!value || "必ず入力してください";
const email_pattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRules = (v: any) => !v || email_pattern.test(v) || "有効なメールアドレスではありません。";
const validForm = ref();

// サインアップ処理
async function singUp() {
  try {
    const validResult = await validForm.value.validate();

    if (validResult.valid) {
      state.success = true;
      state.creating = true;
      const { user } = await createUserWithEmailAndPassword(auth, state.email, state.password);
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        name: state.name,
        email: state.email,
      });
      router.push("/");
    } else {
      state.success = false;
    }
  } catch (error) {
    alert(`エラー ${error}`);
  } finally {
    state.creating = false;
  }
}
</script>
