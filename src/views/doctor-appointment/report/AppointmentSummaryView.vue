<template>
	<v-data-table
		:headers="headers"
		:items="monthlySummary"
		class="elevation-1"
		loading="tableLoader"
		loading-text="Loading... Please wait"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Monthly Appointment Summary</v-toolbar-title>
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
	</v-data-table>
</template>

<script>
import API_END_POINTS from '@/shared/ApiEndPoint';
import axios from 'axios';
import moment from 'moment';

export default {
	name: 'AppointmentSummaryView',
	data: () => ({
		menu: false,
		selectedMonth: new Date().toISOString().substr(0, 7),
		headers: [
			{ text: 'Date', value: 'date' },
			{ text: 'No. of Appointments', value: 'no_of_appointments' },
			{
				text: 'No. of Appointment Closed',
				value: 'no_of_closed_appointments',
			},
			{
				text: 'No. of Appointment Cancelled',
				value: 'no_of_cancelled_appointments',
			},
		],
		monthlySummary: [],
		tableLoader: false,
	}),
	methods: {
		async fetchAppointmentSummary() {
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
					`${API_END_POINTS.MONTHLY_SUMMARY_REPORT}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
				);
				if (!response) {
					throw 'error';
				}

				this.monthlySummary = response.data.data.summary;
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
			this.fetchAppointmentSummary();
		},
	},
	created() {
		this.fetchAppointmentSummary();
	},
};
</script>

<style scoped></style>
