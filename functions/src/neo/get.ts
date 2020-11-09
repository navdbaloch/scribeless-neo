import * as functions from 'firebase-functions';
import neoClient from '../services/neo-client';

export const neoGet = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  let response;
  try {
    const apiResponse = await neoClient.get(`neo/${req.query.asteroidId}`);
    response = apiResponse;
  } catch (err) {
    response = {
      error: err.message,
    };
  }
  res.json(response);
});
