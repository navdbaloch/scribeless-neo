export const loader = {
  namespaced: true,
  state: {
    loading: false,
  },
  actions: {
    show(store: any) {
      store.commit('show');
    },
    hide(store: any) {
      store.commit('hide');
    },
  },
  mutations: {
    show(state: any) {
      state.loading = true;
    },
    hide(state: any) {
      state.loading = false;
    },
  },
};
