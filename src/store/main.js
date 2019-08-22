import Vue from "vue";
import Vuex from "vuex";
import Toast from "./toast";

Vue.use(Vuex);

export function createStore() {
	return new Vuex.Store({
		modules: {
			Toast
		},
		state: {
			isShowMask: false,
			isLockPage: false
		},
		mutations: {
			OPEN_DIALOG(state, type) {
				state[`isShowDialog${type}`] = true;
				state.isShowMask = true;
			},
			CLOSE_DIALOG(state, type) {
				state[`isShowDialog${type}`] = false;
				state.isShowMask = false;
			},
			TOGGLE_PAGE_LOCKED(state, type) {
				state.isLockPage = type;
			}
		},
		actions: {}
	});
}
