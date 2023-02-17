import Vue from 'vue';
import VueRouter from 'vue-router';
import MyAppointmentView from '../views/doctor-appointment/doctor/MyAppointmentView.vue';
import PageNotFoundView from '../views/doctor-appointment/PageNotFoundView.vue';
import AppointmentDetailedView from '../views/doctor-appointment/report/AppointmentDetailedView.vue';
import AppointmentSummaryView from '../views/doctor-appointment/report/AppointmentSummaryView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: 'home',
	},
	{
		path: '/home',
		name: 'home',
		component: () =>
			import(
				/* webpackChunkName: "home" */ '../views/doctor-appointment/home/HomeView.vue'
			),
		children: [
			// Sub views will be rendered inside User's <router-view>
			// when path is matched
			// ...other sub routes
		],
	},
	{
		path: '/doctor',
		name: 'doctor',
		component: () =>
			import(
				/* webpackChunkName: "doctor" */ '../views/doctor-appointment/doctor/DoctorView.vue'
			),
		children: [
			// Sub views will be rendered inside User's <router-view>
			// when path is matched
			// ...other sub routes

			{
				path: 'my-appointments',
				name: 'my appointments',
				component: MyAppointmentView,
			},
			{
				path: 'appointment-summary-report',
				name: 'appointments summary report',
				component: AppointmentSummaryView,
			},
			{
				path: 'appointment-detailed-report',
				name: 'appointments detailed report',
				component: AppointmentDetailedView,
			},
		],
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
	},
	{
		path: '*',
		name: 'page not found',
		component: PageNotFoundView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
