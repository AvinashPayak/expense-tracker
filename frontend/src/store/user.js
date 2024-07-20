
export default {
    name: "user",
    state: {
        isLoggedIn: false,
        userDetails: {},
    },
    mutations: {
        setUserDetails(state, userDetails){
            state.userDetails = userDetails;
        },
        setUserLoggedIn(state, loggedInStatus){
            state.isLoggedIn = loggedInStatus;
        },
    },
    actions: {

    },
    getters: {
        GetUserLoggedInStatus(state) {
            return state.isLoggedIn;
        },
        GetUserDetails(state) {
            return state.userDetails;
        },
    }
};