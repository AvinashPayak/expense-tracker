import axiosInstance from "../utils/axios";

export default {
  name: "user",
  state: {
    isLoggedIn: false,
    userDetails: {},
    userCurrentTab: 1,
    walkthroughCompleted: null,
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
  actions: {
    async getUserDetails(state) {
      try {
        const {
          data: { data: userData, state },
        } = await axiosInstance.get("/user-details");
        if (state) {
          store.commit("setUserDetails", userData);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
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
