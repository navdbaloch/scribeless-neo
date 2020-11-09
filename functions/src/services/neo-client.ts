import axios from 'axios';

class NeoClient {
  async get(path: string, data?: any): Promise<any> {
    let params: any = {};
    if (data) {
      params = { ...data };
    }

    params.api_key = process.env.NEO_API_KEY;

    const url = `${process.env.NEO_API_URL}/${path}?${this.serialize(params)}`;

    const response = await axios.get(url);
    return response.data;
  }

  serialize(obj: any): string {
    const str = [];
    for (const p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }
}

export default new NeoClient();
