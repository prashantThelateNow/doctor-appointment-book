export default {
	install(Vue) {
		Vue.prototype.$dialog = {
			openDialog(dialog) {
				if (dialog) {
					dialog.open();
				}
			},
			closeDialog(dialog) {
				if (dialog) {
					dialog.hide();
				}
			},
		};
	},
};
