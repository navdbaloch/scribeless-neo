import * as functions from 'firebase-functions';
import neoClient from '../services/neo-client';
const pageSize = 10;

export const neoBrowse = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  const data: any = {
    size: pageSize,
    page: 0,
  };

  if (req.query.page) {
    data.page = req.query.page;
  }

  console.log(data);
  const response = await neoClient.get('neo/browse', data);

  res.json(response);
});
