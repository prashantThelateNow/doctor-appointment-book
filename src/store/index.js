import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userData: null,
	},
	getters: {
		getUserData: (state) => state.userData,
	},
	mutations: {
		SET_USER_DATA(state, payload) {
			state.userData = payload;
		},
	},
	actions: {
		onUserLogin: (context, payload) => {
			context.commit('SET_USER_DATA', payload);
		},

		onLogout(context, payload) {
			context.commit('SET_USER_DATA', payload);
		},
	},
	modules: {},
});
