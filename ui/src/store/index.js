import Vue from 'vue';
import Vuex from 'vuex';

import { storeAlert } from './store-alert';
import { storeAuth } from './store-auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    alert: storeAlert,
    auth: storeAuth
  }
});

export default store;