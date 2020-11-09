<template>
  <div id="app">
    <Loader :visible="loading" />
    <div id="nav">
      <div class="logo">
        <router-link to="/">
          <img src="/logo.png" alt="" />
          Asteroid Explorer
        </router-link>
      </div>

      <ul class="links">
        <li>
          <router-link to="/">Explore</router-link>
        </li>
        <li>
          <router-link to="/feed">Feed</router-link>
        </li>
        <li>
          <router-link to="/search">Search</router-link>
        </li>
        <li v-if="user.loggedIn === false">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="user.loggedIn === true">
          <router-link to="/favs">Favourites</router-link>
        </li>
        <li v-if="user.loggedIn === true">
          <a href="#" v-on:click="logout()">Logout</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/loader";
import { mapGetters } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import firebase from "./services/firebase";

@Component({
  name: "app",
  components: { Loader },
  computed: {
    ...mapState("loader", ["loading"]),
    ...mapGetters({
      user: "user"
    })
  }
})
export default class App extends Vue {
  async logout() {
    await firebase.auth().signOut();
    window.location.href = "/login";
  }
}
</script>

<style src="firebaseui/dist/firebaseui.css"></style>
<style src="./assets/css/app.css"></style>
