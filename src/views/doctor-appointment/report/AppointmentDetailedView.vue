<!-- eslint-disable vue/valid-v-slot -->
<template>
	<v-data-table
		:headers="headers"
		:items="monthlyApppointmentDetail"
		:group-by="groupBy"
		:group-desc="true"
		class="elevation-1"
		loading="tableLoader"
		loading-text="Loading... Please wait"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>
					Monthly Appointment Detail Summary
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<template>
					<v-row class="d-flex justify-end align-center">
						<v-col cols="12" sm="7">
							<v-menu
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								:return-value.sync="selectedMonth"
								transition="scale-transition"
								offset-y
								max-width="290px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="selectedMonth"
										label="Select Month"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="selectedMonth"
									type="month"
									no-title
									scrollable
									@change="onMonthChange()"
								>
									<v-spacer></v-spacer>
									<v-btn
										text
										color="primary"
										@click="menu = false"
									>
										Cancel
									</v-btn>
									<v-btn
										text
										color="primary"
										@click="$refs.menu.save(selectedMonth)"
									>
										OK
									</v-btn>
								</v-date-picker>
							</v-menu>
						</v-col>
					</v-row>
				</template>
			</v-toolbar>
		</template>
		<template v-slot:item.appointment_status="{ item }">
			<v-chip
				small
				color="success"
				v-if="item.appointment_status === 'Open'"
			>
				Open
			</v-chip>
			<v-chip
				small
				color="error"
				v-else-if="item.appointment_status === 'Closed'"
			>
				Closed
			</v-chip>
			<v-chip small color="warning" v-else>Cancelled</v-chip>
		</template>
	</v-data-table>
</template>

<script>
import API_END_POINTS from '@/shared/ApiEndPoint';
import axios from 'axios';
import moment from 'moment';

export default {
	name: 'AppointmentDetailedView',
	data: () => ({
		menu: false,
		selectedMonth: moment().format('YYYY-MM'),
		headers: [
			{ text: 'Date', value: 'date' },
			{ text: 'Patient Name', value: 'patient_name' },
			{ text: 'Status', value: 'appointment_status' },
		],
		monthlyApppointmentDetail: [],
		groupBy: 'date',
		tableLoader: false,
	}),
	methods: {
		async fetchMonthlyAppointmentDetail() {
			this.tableLoader = true;
			try {
				const startDate = moment(this.selectedMonth, 'YYYY-MM').startOf(
					'month',
				);
				const endDate = moment(this.selectedMonth, 'YYYY-MM').endOf(
					'month',
				);
				const formattedStartDate = startDate.format('YYYY-MM-DD');
				const formattedEndDate = endDate.format('YYYY-MM-DD');
				let response = await axios.get(
					`${API_END_POINTS.APPOINTMENT_DETAILED_REPORT}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
				);
				if (!response) {
					throw 'error';
				}

				this.monthlyApppointmentDetail =
					response.data.data.appointment_detail;
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

		onMonthChange() {
			this.fetchMonthlyAppointmentDetail();
		},
	},
	created() {
		this.fetchMonthlyAppointmentDetail();
	},
};
</script>

<style scoped></style>
