<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title class="headline">Dialog Title</v-card-title>
			<v-card-text>Dialog content goes here.</v-card-text>
			<v-card-actions>
				<v-btn @click="dialog = false">Cancel</v-btn>
				<v-btn @click="dialog = false" color="primary">OK</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

<style scoped></style>
