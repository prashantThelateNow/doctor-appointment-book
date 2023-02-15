import axios from 'axios';
import Vue from 'vue';

const httpClient = () => {
	Vue.prototype.$http = axios;
};

export default httpClient;
