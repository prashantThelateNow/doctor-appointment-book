<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-data-table
		:headers="headers"
		:items="appointments"
		class="elevation-1"
		loading="tableLoader"
		loading-text="Loading... Please wait"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>My Appointment</v-toolbar-title>
			</v-toolbar>
		</template>
		<template v-slot:item.appointment_status="{ item }">
			<v-chip small :color="getColor(item.appointment_status)" dark>
				{{ item.appointment_status }}
			</v-chip>
		</template>
		<template v-slot:item.action="{ item }">
			<div v-if="item.appointment_status === 'Open'">
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-icon
							v-bind="attrs"
							v-on="on"
							color="error"
							@click="updateAppointmentStatus(item, 'Closed')"
						>
							mdi-close
						</v-icon>
					</template>
					<span>Close</span>
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-icon
							v-bind="attrs"
							v-on="on"
							color="warning"
							@click="updateAppointmentStatus(item, 'Cancelled')"
						>
							mdi-cancel
						</v-icon>
					</template>
					<span>Cancel</span>
				</v-tooltip>
			</div>
		</template>
	</v-data-table>
</template>

<script>
import API_END_POINTS from '@/shared/ApiEndPoint';
import axios from 'axios';

export default {
	name: 'MyAppointmentView',
	data: () => ({
		headers: [
			{ text: 'Appointment Date', value: 'appointment_date' },
			{ text: 'Appointment Time', value: 'appointment_time' },
			{ text: 'Appointment Status', value: 'appointment_status' },
			{ text: 'Patient Name', value: 'patient_name' },
			{ text: 'Patient Email', value: 'patient_email' },
			{ text: 'Patient Phone', value: 'patient_phone' },
			{ text: 'Action', value: 'action', sortable: false },
		],
		appointments: [],
		tableLoader: false,
	}),
	methods: {
		async fetchAppointments() {
			this.tableLoader = true;
			try {
				const { id: doctorId } =
					this.$store.getters.getUserData.doctor_data;
				let response = await axios.get(
					`${API_END_POINTS.FETCH_DOCTORS_APPOINTMENTS}${doctorId}`,
				);
				if (!response) {
					throw 'error';
				}

				this.appointments = response.data.data.appointments;
				this.snackbarConfig = {
					snackbar: true,
					text: `${response.data.message}`,
				};
			} catch (error) {
				console.log(error);
			} finally {
				this.tableLoader = false;
			}
		},

		getColor(appointment_status) {
			return appointment_status === 'Open'
				? 'success'
				: appointment_status === 'Closed'
				? 'error'
				: 'warning';
		},

		async updateAppointmentStatus(row, status) {
			try {
				let response = await axios.patch(
					`${API_END_POINTS.UPDATE_DOCTORS_APPOINTMENT_STATUS}${row.id}`,
					{
						appointment_status: status,
					},
				);
				if (!response) {
					throw 'error';
				}

				this.fetchAppointments();
				this.snackbarConfig = {
					snackbar: true,
					text: `${response.data.message}`,
				};
			} catch (error) {
				console.log(error);
			}
		},
	},
	created() {
		this.fetchAppointments();
	},
};
</script>

<style scoped></style>
