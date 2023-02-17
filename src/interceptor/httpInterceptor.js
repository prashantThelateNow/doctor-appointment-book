import axios from 'axios';

const authInterceptor = () => {
	axios.interceptors.request.use(
		(config) => {
			const user = localStorage.getItem('userData');
			if (!!user) {
				let { token } = JSON.parse(user);
				config.headers['Authorization'] = token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	//Response handling
	axios.interceptors.response.use(
		(response) => {
			if (response.status === 200 || response.status === 201) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(response);
			}
		},
		(error) => {
			if (error.response.status) {
				switch (error.response.status) {
					case 400:
						alert(`${error.response.data.message}`);
						break;

					case 401:
						alert('session expired');
						break;
					case 403:
						// router.replace({
						// 	path: '/login',
						// 	query: {
						// 		redirect: router.currentRoute.fullPath,
						// 	},
						// });
						break;
					case 404:
						alert('page not exist');
						break;
					case 502:
					// setTimeout(() => {
					// 	router.replace({
					// 		path: '/login',
					// 		query: {
					// 			redirect: router.currentRoute.fullPath,
					// 		},
					// 	});
					// }, 1000);
				}
				return Promise.reject(error.response);
			}
		},
	);
};

export default authInterceptor;
