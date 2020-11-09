import httpClient from './http-client';

const actionScope = `loader`;
export function setupInterceptors(store: any) {
  let requestsPending = 0;
  const req = {
    pending: () => {
      requestsPending++;
      store.dispatch(`${actionScope}/show`);
    },
    done: () => {
      requestsPending--;
      if (requestsPending <= 0) {
        store.dispatch(`${actionScope}/hide`);
      }
    },
  };
  httpClient.interceptors.request.use(
    (config) => {
      req.pending();
      return config;
    },
    (error) => {
      requestsPending--;
      req.done();
      return Promise.reject(error);
    }
  );
  httpClient.interceptors.response.use(
    ({ data }) => {
      req.done();
      return Promise.resolve(data);
    },
    (error) => {
      req.done();
      return Promise.reject(error);
    }
  );
}
