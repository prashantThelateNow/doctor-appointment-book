import Vue from 'vue';
import App from './App.vue';
import globalAuthGuard from './guards/globalAuthGuard';
import authInterceptor from './interceptor/httpInterceptor';
import vuetify from './plugins/vuetify';
import router from './router';
import VDialogService from './shared/VDialogService';
import store from './store';

// Vue.use(httpClient);
Vue.use(globalAuthGuard);
Vue.use(authInterceptor);
Vue.use(VDialogService);

Vue.config.productionTip = false;

// Load state from localStorage
const appState = localStorage.getItem('app-state');
if (!!appState) {
	const savedState = JSON.parse(appState);
	if (savedState) {
		store.replaceState(savedState);
	}
}

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
