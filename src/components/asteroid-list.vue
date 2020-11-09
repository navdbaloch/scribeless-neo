<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Close Approach Date</th>
          <th>Is potentially Hazardous</th>
          <th>Abs. Magnitude</th>
          <th>Designation</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>
            <router-link :to="'/search/' + item.id">
              {{ item.id }}
            </router-link>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ getCloseApproachDate(item) }}</td>
          <td>{{ item.is_potentially_hazardous_asteroid }}</td>
          <td>{{ item.absolute_magnitude_h }}</td>
          <td>{{ item.designation }}</td>
          <td>
            <button
              v-if="showFavBtn"
              v-on:click="addToFav(item)"
              class="btn sm"
            >
              Add to fav
            </button>
            <a class="btn sm" target="_blank" :href="item.nasa_jpl_url">
              Nasa JPL
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { NearEarthObject } from "@/models/browse-response";
import { Component, Prop, Vue } from "vue-property-decorator";
import database, { CollectionEnum } from "../services/database";

@Component({
  name: "asteroid-list"
})
export default class AsteroidList extends Vue {
  @Prop() list: NearEarthObject[] | undefined;
  @Prop() showFavBtn: boolean | undefined;

  getCloseApproachDate(item: NearEarthObject) {
    if (item.close_approach_data && item.close_approach_data.length > 0) {
      return item.close_approach_data[0].close_approach_date;
    }

    return "N/A";
  }

  async addToFav(item: NearEarthObject) {
    await database.add(item, CollectionEnum.Favourites);
    this.$router.push("/favs");
  }
}
</script>

<style scoped>
table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}

table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}

table > tbody > tr > td,
table > tbody > tr > th,
table > thead > tr > td,
table > thead > tr > th {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
  text-align: left;
}

.wrapper {
  overflow: auto;
  width: 100%;
}
</style>
