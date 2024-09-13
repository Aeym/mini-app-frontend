import { defineStore } from "pinia";

export const useChildCareStore = defineStore("childCare", {
	state: () => ({
		name: "",
	}),

	actions: {
		setName(name: string) {
			this.name = name;
		},

		clearName() {
			this.name = "";
		},
	},
});
