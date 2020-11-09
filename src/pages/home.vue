<template>
  <div class="home">
    <h1>List</h1>
    <AsteroidList :showFavBtn="true" :list="nearEarthObjects"></AsteroidList>
    <div class="pagination" v-if="paginationData">
      Showing
      {{ paginationData.size * paginationData.number + 1 }} to
      {{ paginationData.size * (paginationData.number + 1) }} out of
      {{ paginationData.total_elements }}
      <div class="inline-block">
        <button
          title="Previous Page"
          class="btn sx"
          v-on:click="changePage(-1)"
          :disabled="paginationData.number === 0"
        >
          {{ "<" }}
        </button>
        <button title="Next Page" class="btn sx ml" v-on:click="changePage(1)">
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AsteroidList from "@/components/asteroid-list.vue"; // @ is an alias to /src
import Api from "../services/api";
import { BrowseResponse, NearEarthObject } from "../models/browse-response";
import { Page } from "@/models/list-response";
// import { Page } from "@/models/list-response";
@Component({
  components: {
    AsteroidList
  }
})
export default class Home extends Vue {
  nearEarthObjects: NearEarthObject[] = [];
  paginationData: Page | undefined;

  created() {
    this.loadData();
  }

  async loadData(pageNumber = 0) {
    const res = await Api.get<BrowseResponse>("neoBrowse", {
      page: pageNumber
    });
    this.nearEarthObjects = res.near_earth_objects;
    this.paginationData = res.page;
  }

  changePage(addValue: number) {
    let pageNumber = 0;
    if (this.paginationData?.number) {
      pageNumber = this.paginationData?.number;
    }
    this.loadData(pageNumber + addValue);
  }
}
</script>
