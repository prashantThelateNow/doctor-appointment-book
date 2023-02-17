<template>
	<div>
		<v-card class="mx-1 my-1">
			<v-card-text class="d-flex justify-space-between align-center">
				<div class="text-subtitle-2 mb-2">{{ doctor.name }}</div>
				<v-btn
					class="text-capitalize"
					color="primary lighten-1"
					small
					@click="showAppointmentDetailDialog()"
				>
					Book Clinic Visit
				</v-btn>
			</v-card-text>
			<v-card-text>
				<v-row align="center" class="mx-0">
					<v-rating
						:value="4.5"
						color="amber"
						dense
						half-increments
						readonly
						size="14"
					></v-rating>

					<div class="grey--text ms-4">4.5 (413)</div>
				</v-row>
			</v-card-text>

			<v-divider class="mx-4"></v-divider>

			<v-card-text>
				<div class="text-subtitle-3 mb-2">
					Book an appointment for
					<span class="font-weight-bold">consultation</span>
				</div>
				<div class="text-subtitle-3">
					<v-icon>mdi-weather-sunset-up</v-icon>
					Morning
				</div>
				<v-chip-group
					active-class="deep-purple accent-4 white--text"
					column
				>
					<v-chip
						v-for="(time, index) in doctor.day_start_time"
						:key="index"
					>
						{{ time }}
					</v-chip>
				</v-chip-group>
				<div class="text-subtitle-3">
					<v-icon>mdi-weather-sunset-down</v-icon>
					Evening
				</div>
				<v-chip-group
					active-class="deep-purple accent-4 white--text"
					column
				>
					<v-chip
						v-for="(time, index) in doctor.day_end_time"
						:key="index"
					>
						{{ time }}
					</v-chip>
				</v-chip-group>
			</v-card-text>
		</v-card>

		<template>
			<v-row justify="center">
				<v-dialog v-model="appointmentDetailDialog" max-width="600px">
					<v-card>
						<v-form ref="appointmentDetailForm">
							<v-card-text>
								<div class="text-subtitle-2 mb-2">
									Please provide your appointment details
								</div>
								<v-container class="grey lighten-4">
									<div class="text-subtitle-3 mb-2">
										Appointment Information
									</div>
									<v-row>
										<v-col cols="12" sm="6">
											<v-menu
												ref="menu"
												v-model="menu"
												:close-on-content-click="false"
												:return-value.sync="
													appointment.appointmentDate
												"
												transition="scale-transition"
												offset-y
												min-width="auto"
											>
												<template
													v-slot:activator="{
														on,
														attrs,
													}"
												>
													<v-text-field
														v-model="
															appointment.appointmentDate
														"
														label="Appointment date"
														prepend-inner-icon="mdi-calendar"
														dense
														readonly
														v-bind="attrs"
														v-on="on"
														outlined
														:rules="validationRules"
													></v-text-field>
												</template>
												<v-date-picker
													v-model="
														appointment.appointmentDate
													"
													no-title
													scrollable
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
														@click="
															$refs.menu.save(
																appointment.appointmentDate,
															)
														"
													>
														OK
													</v-btn>
												</v-date-picker>
											</v-menu>
										</v-col>
										<v-col cols="12" sm="6">
											<v-select
												:items="
													doctor.appointment_slot_time
												"
												v-model="
													appointment.appointmentTimeSlot
												"
												label="Time Slot"
												dense
												outlined
												:rules="validationRules"
											></v-select>
										</v-col>
									</v-row>
									<v-divider></v-divider>
									<div class="text-subtitle-4 my-2">
										Patient Information
									</div>
									<v-row>
										<v-col cols="12" sm="4">
											<v-text-field
												v-model="
													appointment.patientName
												"
												:rules="validationRules"
												label="Patient name"
												outlined
												dense
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="4">
											<v-text-field
												v-model="
													appointment.patientEmail
												"
												:rules="validationRules"
												label="Patient email"
												outlined
												dense
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="4">
											<v-text-field
												v-model="
													appointment.patientPhone
												"
												:rules="validationRules"
												label="Patient phone"
												outlined
												dense
											></v-text-field>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>
							<v-card-actions>
								<v-btn
									class="text-capitalize"
									color="primary"
									outlined
									@click="submitAppointment()"
								>
									Submit
								</v-btn>
							</v-card-actions>
						</v-form>
					</v-card>
				</v-dialog>
			</v-row>
		</template>
		<template>
			<div class="text-center">
				<v-overlay :value="overlay">
					<v-progress-circular
						indeterminate
						size="64"
					></v-progress-circular>
				</v-overlay>
			</div>
		</template>
		<template>
			<div class="text-center ma-2">
				<v-snackbar v-model="snackbarConfig.snackbar">
					{{ snackbarConfig.text }}

					<template v-slot:actions>
						<v-btn
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
import API_END_POINTS from '@/shared/ApiEndPoint';
import axios from 'axios';

export default {
	name: 'DoctorCardComponent',
	props: {
		doctor: {},
	},
	data: () => ({
		menu: false,
		overlay: false,
		appointmentDetailDialog: false,
		appointment: {
			appointmentDate: '',
			appointmentTimeSlot: '',
			appointmentStatus: 'Open',
			patientName: '',
			patientEmail: '',
			patientPhone: '',
		},
		validationRules: [(v) => !!v || 'This field is required'],
		snackbarConfig: {
			snackbar: false,
			text: '',
		},
	}),
	methods: {
		showAppointmentDetailDialog() {
			this.appointmentDetailDialog = true;
		},
		submitAppointment() {
			if (this.$refs.appointmentDetailForm.validate()) {
				this.appointmentDetailDialog = false;
				this.bookAppointment();
			}
		},
		async bookAppointment() {
			this.overlay = true;
			try {
				let {
					appointmentDate: appointment_date,
					appointmentTimeSlot: appointment_time,
					patientName: patient_name,
					patientEmail: patient_email,
					patientPhone: patient_phone,
					appointmentStatus: appointment_status,
				} = this.appointment;
				let { id: doctor_id } = this.doctor;
				let response = await axios.post(
					`${API_END_POINTS.BOOK_APPOINTMENT}`,
					{
						doctor_id,
						appointment_date,
						appointment_time,
						patient_name,
						patient_email,
						patient_phone,
						appointment_status,
					},
				);
				if (!response) {
					throw 'error';
				}

				this.snackbarConfig = {
					snackbar: true,
					text: `${response.data.message}`,
				};
			} catch (error) {
				console.log(error);
			} finally {
				this.overlay = false;
			}
		},
	},
};
</script>

<style scoped></style>
