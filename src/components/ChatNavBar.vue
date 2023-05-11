<template>
  <nav id="chat-navbar" class="navbar navbar-expand-md navbar-dark bg-info">
    <a class="navbar-brand" href="#"> Vue Chat </a>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h4 class="subheading">名前: {{ state.name }}</h4>
        <h4 class="subheading">メールアドレス:{{ state.email }}</h4>
        <v-btn @click="logout">ログアウト</v-btn>
      </v-col>
    </v-row>
  </nav>
</template>

<script lang="ts">
import { computed, reactive, onMounted } from "vue";
import { mapState } from "vuex";

import { auth, db } from "../plugins/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { useRouter } from "vue-router";

export default {
  name: "ChatNavBar",
  setup() {
    const { user } = mapState(["user"]);

    const state = reactive({
      name: "",
      email: "",
      password: "",
      loading: false,
    });

    const router = useRouter();

    async function getUser() {
      return await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) resolve(user);
          else reject(null);
        });
      });
    }

    async function logout() {
      try {
        state.loading = true;
        await signOut(auth);
        router.push("/");
      } catch (error) {
        alert(`エラー ${error}`);
      } finally {
        state.loading = false;
      }
    }

    onMounted(async () => {
      //ログイン情報取得
      const user = await getUser();
      //ログイン情報がないときは、処理を抜ける
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (!data) return;
        state.name = data.name;
        state.email = data.email;
      });
    });

    return {
      user,
      state,
      getUser,
      logout,
    };
  },
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>
