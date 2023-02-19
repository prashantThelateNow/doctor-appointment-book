<template>
	<div>
		<v-navigation-drawer v-model="drawer" app>
			<v-list class="d-flex align-center">
				<v-list-item>
					<v-avatar color="indigo lighten-1">
						<v-icon dark>mdi-account-circle</v-icon>
					</v-avatar>
				</v-list-item>

				<v-list-item link>
					<v-list-item-content>
						<v-list-item-title class="text-h6">
							{{ loggedInUser.name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ loggedInUser.email }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list nav dense>
				<v-list-item link>
					<v-list-item-icon>
						<v-icon>mdi-home</v-icon>
					</v-list-item-icon>
					<v-list-item-title>Home</v-list-item-title>
				</v-list-item>

				<v-list-group :value="true" prepend-icon="mdi-doctor">
					<template v-slot:activator>
						<v-list-item-title>Doctor</v-list-item-title>
					</template>

					<v-list-item
						v-for="(
							[title, icon, routerLink], i
						) in sidebarMenus.appointments"
						:key="i"
						link
						:to="routerLink"
					>
						<v-list-item-icon>
							<v-icon v-text="icon"></v-icon>
						</v-list-item-icon>
						<v-list-item-title v-text="title"></v-list-item-title>
					</v-list-item>
				</v-list-group>

				<v-list-group :value="true" prepend-icon="mdi-file-chart">
					<template v-slot:activator>
						<v-list-item-title>Reports</v-list-item-title>
					</template>

					<v-list-item
						v-for="(
							[title, icon, routerLink], i
						) in sidebarMenus.reports"
						:key="i"
						link
						:to="routerLink"
					>
						<v-list-item-icon>
							<v-icon v-text="icon"></v-icon>
						</v-list-item-icon>
						<v-list-item-title v-text="title"></v-list-item-title>
					</v-list-item>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="primary" dense dark>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					:src="require('@/assets/doctor_appointment_logo.png')"
					transition="scale-transition"
					width="50"
				/>
			</div>

			<v-toolbar-title>Doctors Appointment System</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item
						v-for="(headerItem, index) in headerListItems"
						:key="index"
						@click="onHeaderMenuClick(headerItem.action)"
					>
						<v-list-item-title>
							<v-icon>{{ headerItem.icon }}</v-icon>
							{{ headerItem.name }}
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			Copyright © {{ new Date().getFullYear() }}, Doctor Appointment
			System. All rights reserved.
		</v-footer>
	</div>
</template>

<script>
export default {
	name: 'DoctorView',
	data: () => ({
		drawer: null,
		headerListItems: [
			{ name: 'Profile', icon: 'mdi-account', action: 'profile' },
			{ name: 'Logout', icon: 'mdi-logout', action: 'logout' },
		],
		sidebarMenus: {
			appointments: [['My Appointments', '', '/doctor/my-appointments']],
			reports: [
				['Monthly Summary', '', '/doctor/appointment-summary-report'],
				[
					'Appointment Detailed',
					'',
					'/doctor/appointment-detailed-report',
				],
			],
		},
	}),
	computed: {
		loggedInUser() {
			return this.$store.getters.getUserData;
		},
	},
	methods: {
		onHeaderMenuClick(action) {
			if (action === 'logout') {
				localStorage.removeItem('authToken');
				this.$store.dispatch('onLogout', null);
				this.$router.push('/home');
			}
		},
	},
};
</script>

<style scoped></style>
