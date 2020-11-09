import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebaseApp from './services/firebase';

Vue.config.productionTip = false;

import { setupInterceptors } from './services/http-interceptor';

firebaseApp.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

new Vue({
  router,
  store,
  created() {
    setupInterceptors(store);
  },
  render: (h) => h(App),
}).$mount('#app');
