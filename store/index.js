import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const store = () =>
	new Vuex.Store({
		state() {
			return {
				token: "",
				user: "",
				loading: false
			};
		},
		getters: {
			getToken(state) {
				return state.token;
			},
			getUser(state) {
				return state.user;
			},
			isAuthenticated(state) {
				return state.auth.loggedIn;
			},

			loggedInUser(state) {
				return state.auth.user;
			}
		},
		mutations: {
			setToken(state, newToken) {
				state.token = newToken;
			},
			setUser(state, newUser) {
				state.user = newUser;
			},
			SET_DATA(state, { id, data }) {
				state[id] = data;
			}
		},
		actions: {
			SET_TOKEN({ commit }, newToken) {
				commit("setToken", newToken);
			},
			SET_USER({ commit }, newUser) {
				commit("setUser", newUser);
			}
		}
	});

export default store;
