<template>
	<div>
		<v-app-bar app dense color="primary" dark>
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

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn
				small
				text
				class="text-capitalize"
				@click="showLoginDialog()"
			>
				Login
			</v-btn>
		</v-app-bar>
		<v-main>
			<template>
				<v-container fluid class="grey lighten-3">
					<v-row no-gutters>
						<v-col
							v-for="(doctor, index) in doctors"
							:key="index"
							cols="12"
							sm="3"
						>
							<doctor-card-component
								:doctor="doctor"
							></doctor-card-component>
						</v-col>
					</v-row>
				</v-container>
			</template>
		</v-main>
		<v-footer app class="d-flex justify-center">
			Copyright © {{ new Date().getFullYear() }}, Doctor Appointment
			System. All rights reserved.
		</v-footer>

		<template>
			<v-row justify="center">
				<v-dialog
					v-model="loginDialog"
					max-width="310px"
					ref="loginDialog"
				>
					<v-card>
						<v-form ref="loginForm">
							<v-card-title class="d-flex justify-center">
								Login
							</v-card-title>
							<v-card-text>
								<v-text-field
									:append-icon="'mdi-account'"
									ref="username"
									v-model="user.username"
									:rules="user.validationRules"
									label="Username"
									placeholder="Username"
								></v-text-field>
								<v-text-field
									:append-icon="
										user.showPassword
											? 'mdi-eye'
											: 'mdi-eye-off'
									"
									:type="
										user.showPassword ? 'text' : 'password'
									"
									ref="password"
									v-model="user.password"
									:rules="user.validationRules"
									label="Password"
									placeholder="Password"
									@click:append="
										user.showPassword = !user.showPassword
									"
								></v-text-field>
							</v-card-text>
							<v-card-actions class="d-flex justify-center">
								<v-btn
									class="text-capitalize"
									color="primary"
									outlined
									:loading="loader"
									@click="login"
								>
									Login
								</v-btn>
							</v-card-actions>
						</v-form>
					</v-card>
				</v-dialog>
			</v-row>
		</template>

		<template>
			<div class="text-center ma-2">
				<v-snackbar v-model="snackbarConfig.snackbar">
					{{ snackbarConfig.text }}

					<template v-slot:actions>
						<v-btn
							color="pink"
							variant="text"
							@click="snackbarConfig.snackbar = false"
						>
							Close
						</v-btn>
					</template>
				</v-snackbar>
			</div>
		</template>
	</div>
</template>

<script>
import DoctorCardComponent from '@/components/DoctorCardComponent.vue';
import axios from 'axios';
import API_END_POINTS from '../../../shared/ApiEndPoint';

export default {
	name: 'HomeView',
	components: {
		'doctor-card-component': DoctorCardComponent,
	},
	data() {
		return {
			user: {
				username: '',
				password: '',
				validationRules: [(v) => !!v || 'This field is required'],
				showPassword: false,
			},
			doctors: [],
			loginDialog: false,
			snackbarConfig: {
				snackbar: false,
				text: '',
			},
			loader: null,
		};
	},
	methods: {
		showLoginDialog() {
			this.loginDialog = true;
		},

		async fetchDoctors() {
			try {
				// await axios.post(`${API_END_POINTS.INIT_DOCTORS}`);

				let response = await axios.get(
					`${API_END_POINTS.FETCH_DOCTORS}`,
				);
				if (!response) {
					throw 'error';
				}

				this.doctors = response.data.data.doctors;
				this.snackbarConfig = {
					snackbar: true,
					text: `${response.data.message}`,
				};
			} catch (error) {
				console.log(error);
			}
		},

		login() {
			if (this.$refs.loginForm.validate()) {
				this.userLogin();
			}
		},

		async userLogin() {
			this.loader = true;
			try {
				let { username, password } = this.user;
				let response = await axios.post(`${API_END_POINTS.LOGIN}`, {
					username,
					password,
				});
				if (!response) {
					throw 'error';
				}

				let { token } = response.data.data;
				localStorage.setItem('authToken', token);
				this.$store.dispatch('onUserLogin', response.data.data);

				this.snackbarConfig = {
					snackbar: true,
					text: `${response.data.message}`,
				};
				setTimeout(() => {
					this.$router.push('/doctor');
				}, 1000);
			} catch (error) {
				console.log(error);
			} finally {
				this.loader = false;
			}
		},
	},
	created() {
		this.fetchDoctors();
	},
};
</script>

<style scoped></style>
