import axios from 'axios';

export default {
	install(Vue) {
		Vue.prototype.$http = axios;
	},
};

// export default httpClient;
