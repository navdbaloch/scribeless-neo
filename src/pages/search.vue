<template>
  <div class="home">
    <h1>Search</h1>
    <div class="filters">
      <label for="">
        Asteriod ID
        <input v-model="asteroidId" type="text" />
      </label>

      <button class="btn" v-on:click="onSearchClkd()">
        Search
      </button>
    </div>
    <p class="error">
      {{ apiErrorMsg }}
    </p>

    <table v-if="data && data.id" class="table">
      <tr>
        <th>ID</th>
        <td>{{ data.id }}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>{{ data.name }}</td>
      </tr>
      <tr>
        <th>Is potentially Hazardous</th>
        <td>{{ data.is_potentially_hazardous_asteroid }}</td>
      </tr>
      <tr>
        <th>Abs. Magnitude</th>
        <td>{{ data.absolute_magnitude_h }}</td>
      </tr>
      <tr>
        <th>Designation</th>
        <td>{{ data.designation }}</td>
      </tr>
      <tr>
        <th>Nasa JPL</th>
        <td>
          <a class="btn sm" target="_blank" :href="data.nasa_jpl_url">Open</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AsteroidList from "@/components/asteroid-list.vue"; // @ is an alias to /src
import Api from "../services/api";
import { NearEarthObject } from "../models/browse-response";

@Component({
  components: {
    AsteroidList
  }
})
export default class Search extends Vue {
  asteroidId = "";
  /**
   * Date range error indicator
   */
  private dateRangeErr = false;
  /**
   * Error message from API
   */
  private apiErrorMsg = "";

  private data: NearEarthObject | null = null;

  created() {
    if (this.$route.params?.id) {
      this.loadData();
    }
  }

  onSearchClkd() {
    this.$router.push(`/search/${this.asteroidId}`);
  }

  @Watch("$route.params.id")
  onParamChanged() {
    this.loadData();
  }

  async loadData() {
    this.asteroidId = this.$route?.params?.id;

    this.data = null;
    this.apiErrorMsg = "";
    const res = await Api.get<NearEarthObject>("neoGet", {
      asteroidId: this.asteroidId
    });

    this.apiErrorMsg = res.error;

    if (!this.apiErrorMsg) {
      this.data = res;
    }
  }
}
</script>
<style scoped>
.table th {
  width: 200px;
  text-align: left;
}
</style>
