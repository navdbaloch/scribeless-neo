<template>
  <div class="home">
    <h1>NEO Feed</h1>
    <div class="filters">
      <label for="">
        Start Date
        <input v-model="params.startDate" type="date" />
      </label>

      <label for=""
        >End Date

        <input v-model="params.endDate" type="date" />
      </label>

      <button class="btn" :disabled="dateRangeErr" v-on:click="onFilterClkd()">
        Filter
      </button>
      <span class="error" v-if="dateRangeErr">
        Date range can not be greater then 7 days
      </span>
    </div>

    <AsteroidList :showFavBtn="true" :list="nearEarthObjects"></AsteroidList>
    <p class="error">
      {{ apiErrorMsg }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import AsteroidList from "@/components/asteroid-list.vue"; // @ is an alias to /src
import Api from "../services/api";
import { BrowseResponse, NearEarthObject } from "../models/browse-response";
import moment from "moment";
const dateFormat = "YYYY-MM-DD";
@Component({
  components: {
    AsteroidList
  }
})
export default class Feed extends Vue {
  /**
   * Date range error indicator
   */
  private dateRangeErr = false;
  /**
   * Error message from API
   */
  private apiErrorMsg = "";

  private nearEarthObjects: NearEarthObject[] = [];
  private params: { startDate: string; endDate: string } = {
    startDate: moment().format(dateFormat),
    endDate: moment().format(dateFormat)
  };

  created() {
    this.loadData();
  }

  @Watch("params", {
    deep: true
  })
  onParamsChanged() {
    const srtMoment = moment(this.params.startDate, dateFormat);
    const endMoment = moment(this.params.endDate, dateFormat);
    this.dateRangeErr = Math.abs(endMoment.diff(srtMoment, "days")) > 7;
  }

  onFilterClkd() {
    this.loadData();
  }

  async loadData() {
    this.nearEarthObjects = [];
    this.apiErrorMsg = "";
    const res = await Api.get<BrowseResponse>("neoFeed", {
      startDate: this.params.startDate,
      endDate: this.params.endDate
    });

    this.apiErrorMsg = res.error;

    if (!this.apiErrorMsg) {
      this.nearEarthObjects = res.near_earth_objects;
    }
  }
}
</script>