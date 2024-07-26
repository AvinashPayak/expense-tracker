export default {
  name: "user",
  state: {
    isLoggedIn: false,
    userDetails: {},
    userCurrentTab: 1,
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
    setUserCurrentTab(state, userCurrentTab) {
      state.userCurrentTab = userCurrentTab;
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
    GetUserCurrentTab(state) {
      return state.userCurrentTab;
    },
  },
};
