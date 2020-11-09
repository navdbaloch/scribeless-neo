export const session = {
  namespaced: false,
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state: any) {
      return state.user;
    },
  },
  actions: {
    fetchUser(store: any, user: any) {
      store.commit('SET_LOGGED_IN', user !== null);
      if (user) {
        store.commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
          id: user.uid,
        });
      } else {
        store.commit('SET_USER', null);
      }
    },
  },
  mutations: {
    SET_LOGGED_IN(state: any, value: boolean) {
      state.user.loggedIn = value;
    },
    SET_USER(state: any, data: any) {
      state.user.data = data;
    },
  },
};
