import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
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

// Watch for changes to the state and persist to localStorage
store.subscribe((mutation, state) => {
	localStorage.setItem('app-state', JSON.stringify(state));
});

export default store;
