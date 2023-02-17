const BASE_URL = 'http://localhost:3000/api/v1/';

const API_END_POINTS = {
	//Login
	LOGIN: `${BASE_URL}user/login`,

	//Doctors
	INIT_DOCTORS: `${BASE_URL}doctor/init`,
	FETCH_DOCTORS: `${BASE_URL}doctor`,

	//Appointments
	BOOK_APPOINTMENT: `${BASE_URL}appointment/book`,
	UPDATE_DOCTORS_APPOINTMENT_STATUS: `${BASE_URL}appointment/`,
	FETCH_DOCTORS_APPOINTMENTS: `${BASE_URL}appointment/`,

	//Reports
	MONTHLY_SUMMARY_REPORT: `${BASE_URL}appointment/report/summary`,
	APPOINTMENT_DETAILED_REPORT: `${BASE_URL}appointment/report/detailed`,
};

export default API_END_POINTS;
