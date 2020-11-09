import * as functions from 'firebase-functions';
import neoClient from '../services/neo-client';
const pageSize = 10;

/**
 * Cloud function to execute neo Feed API, process response for the application
 */
export const neoFeed = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const params = buildApiParams(req.query);
  let response;
  try {
    const apiResponse = await neoClient.get('feed', params);
    const nearEarthObjects = flattenList(apiResponse.near_earth_objects);
    const sortedNeos = sortOnClosestApproach(nearEarthObjects);
    response = {
      ...apiResponse,
      near_earth_objects: sortedNeos.splice(0, pageSize),
    };
  } catch (err) {
    response = {
      error: err.message,
    };
  }

  res.json(response);
});

/**
 * Sort the list on closest approach date
 * @param nearEarthObjects list of NEOs
 */
const sortOnClosestApproach = function(nearEarthObjects: any[]) {
  // extract out the epoch_date_close_approach on object level
  const nearEarthObjectsWithEpochTime = nearEarthObjects.map((neo: any) => {
    return {
      ...neo,
      epoch_date_close_approach:
        neo.close_approach_data[0].epoch_date_close_approach,
    };
  });

  // sort the list on epoch_date_close_approach
  return nearEarthObjectsWithEpochTime.sort((neo1, neo2) => {
    return neo1.epoch_date_close_approach - neo2.epoch_date_close_approach;
  });
};

/**
 * Flatten the grouped by date list of objects into a single list
 * @param apiResponse
 * @returns []
 */
const flattenList = function(near_earth_objects: {
  [date: string]: any[];
}): any[] {
  let list: any[] = [];
  for (const date in near_earth_objects) {
    if (near_earth_objects.hasOwnProperty(date)) {
      list = list.concat(near_earth_objects[date]);
    }
  }
  return list;
};

/**
 * Build api params object from http query
 * @param query params from incoming http request
 */
const buildApiParams = function(query: any): any {
  return {
    start_date: query.startDate,
    end_date: query.endDate,
  };
};
