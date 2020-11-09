<template>
  <div class="home">
    <h1>Favourites</h1>

    <AsteroidList :showFavBtn="false" :list="nearEarthObjects"></AsteroidList>
    <p class="error">
      {{ apiErrorMsg }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AsteroidList from "@/components/asteroid-list.vue";
import database, { CollectionEnum } from "../services/database";
import { NearEarthObject } from "../models/browse-response";
import firebaseApp from "../services/firebase";

@Component({
  components: {
    AsteroidList
  }
})
export default class Favourites extends Vue {
  /**
   * Date range error indicator
   */
  private dateRangeErr = false;
  /**
   * Error message from API
   */
  private apiErrorMsg = "";

  private nearEarthObjects: NearEarthObject[] | undefined = [];

  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.loadData();
      }
    });
  }

  async loadData() {
    this.nearEarthObjects = [];
    this.apiErrorMsg = "";
    const res = await database.get<NearEarthObject>(CollectionEnum.Favourites);
    if (res === false) {
      this.apiErrorMsg = "Something went wrong";
      return;
    }
    this.nearEarthObjects = (res as unknown) as NearEarthObject[];
  }
}
</script>
