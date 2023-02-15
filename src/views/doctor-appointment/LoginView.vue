<template>
	<div class="login-container">
		<form class="login-form" @submit.prevent="handleSubmit">
			<h1 class="title">Login</h1>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" v-model.trim="email" required />
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					v-model.trim="password"
					required
				/>
			</div>
			<button type="submit" class="btn">Submit</button>
		</form>
	</div>
</template>

<script>
export default {
	name: 'LoginView',
	data() {
		return {
			email: '',
			password: '',
		};
	},
	methods: {
		handleSubmit() {
			// Handle login form submission
		},
	},
};
</script>

<style>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}

.login-form {
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	padding: 20px;
	width: 400px;
}

.title {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
	text-align: center;
}

.form-group {
	margin-bottom: 10px;
}

label {
	display: block;
	margin-bottom: 5px;
}

input {
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	padding: 10px;
	width: 100%;
}

.btn {
	background-color: #4caf50;
	border: none;
	border-radius: 4px;
	color: #fff;
	cursor: pointer;
	font-size: 16px;
	margin-top: 20px;
	padding: 10px;
	width: 100%;
}

@media (max-width: 768px) {
	.login-form {
		width: 100%;
	}
}
</style>
