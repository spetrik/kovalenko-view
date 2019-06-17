export const storeAuth = {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  getters: {
    loggedIn (state) {
      return !!state.user;
    }
  },
  mutations: {
    loginSuccess(state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.user = null;
    }
  }
};
