import httpClient from './http-client';

class Api {
  private buildUrl(path: string) {
    return `${process.env.VUE_APP_API_URL}/${path}`;
  }

  public async get<T>(path: string, data?: any): Promise<T> {
    const url = this.buildUrl(path);
    const response = await httpClient.get<T>(url, {
      params: data,
    });
    return (response as unknown) as T;
  }
}

export default new Api();
