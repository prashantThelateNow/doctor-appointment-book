import Vue from 'vue';
import App from './App.vue';
import authInterceptor from './interceptor/httpInterceptor';
import router from './router';
import store from './store';

// Vue.use(httpClient);
Vue.use(authInterceptor);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
