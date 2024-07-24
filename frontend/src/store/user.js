export default {
  name: "user",
  state: {
    isLoggedIn: false,
    userDetails: {},
  },
  mutations: {
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    },
    setUserLoggedIn(state, loggedInStatus) {
      state.isLoggedIn = loggedInStatus;
    },
    setWalkthroughCompleted(state, walkthroughCompleted) {
      state.userDetails.walkthroughCompleted = walkthroughCompleted;
    },
  },
  actions: {},
  getters: {
    GetUserLoggedInStatus(state) {
      return state.isLoggedIn;
    },
    GetUserDetails(state) {
      return state.userDetails;
    },
    IsWalkthroughCompleted(state) {
      return state.userDetails.walkthroughCompleted;
    },
    GetUserUuid(state) {
      return state.userDetails?.uuid;
    },
  },
};
