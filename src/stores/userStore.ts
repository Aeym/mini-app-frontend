import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		username: localStorage.getItem("username") || "",
	}),

	actions: {
		setUsername(name: string) {
			this.username = name;
			localStorage.setItem("username", name);
		},

		clearUsername() {
			this.username = "";
			localStorage.removeItem("username");
		},
	},
});
