import { createRouter, createWebHistory } from "vue-router";

import ChildCareView from "@/views/ChildCareView.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/home",
			name: "home",
			component: HomeView,
		},
		{
			path: "/child-care/:id",
			name: "child-care",
			component: ChildCareView,
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/home",
		},
	],
});

router.beforeEach((to, _from, next) => {
	const userStore = useUserStore();
	const isLoggedIn = !!userStore.username;

	if (!isLoggedIn && to.name !== "login") {
		return next({ name: "login" });
	}

	if (isLoggedIn && to.name === "login") {
		return next({ name: "home" });
	}

	next();
});

export default router;
