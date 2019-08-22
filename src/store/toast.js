const data = {
	namespaced: true,
	state: {
		message: '',
		preList: []
	},
	mutations: {
		toast(state, messages) {
			if (!state.message) {
				state.message = createMsg(messages.shift());
			}
			state.preList = [].concat(state.preList, messages);
		},
		shift(state) {
			if (state.preList.length) {
				state.message = createMsg(state.preList.shift());
			} else {
				state.message = null;
			}
		},
		cleanList(state) {
			state.preList = [];
		}
	}
};
function createMsg(message) {
	return {
		msg: message,
		time: new Date().getTime()
	};
}
export default data;
