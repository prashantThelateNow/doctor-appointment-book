import router from '@/router';

const isAuthenticated = () =>
	localStorage.getItem('authToken') ? true : false;

const globalAuthGuard = () => {
	router.beforeEach((to, from, next) => {
		if (to.matched.some((record) => record.meta.requiresAuth)) {
			// this route requires auth, check if logged in
			// if not, redirect to login page.
			if (to.name !== 'home' && !isAuthenticated()) {
				next({
					path: '/home',
					// query: { redirect: to.fullPath },
				});
			} else {
				next();
			}
		} else {
			next();
		}
	});
};

export default globalAuthGuard;
