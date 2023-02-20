import MyAppointmentView from '@/views/doctor/MyAppointmentView.vue';
import PageNotFoundView from '@/views/PageNotFoundView.vue';
import AppointmentDetailedView from '@/views/report/AppointmentDetailedView.vue';
import AppointmentSummaryView from '@/views/report/AppointmentSummaryView.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

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
			import(/* webpackChunkName: "home" */ '@/views/home/HomeView.vue'),
	},
	{
		path: '/doctor',
		component: () =>
			import(
				/* webpackChunkName: "doctor" */ '@/views/doctor/DoctorView.vue'
			),
		children: [
			{
				path: '',
				redirect: 'my-appointments',
			},

			{
				path: 'my-appointments',
				name: 'my appointments',
				component: MyAppointmentView,
				meta: { requiresAuth: true },
			},
			{
				path: 'appointment-summary-report',
				name: 'appointments summary report',
				component: AppointmentSummaryView,
				meta: { requiresAuth: true },
			},
			{
				path: 'appointment-detailed-report',
				name: 'appointments detailed report',
				component: AppointmentDetailedView,
				meta: { requiresAuth: true },
			},
		],
		meta: { requiresAuth: true },
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
