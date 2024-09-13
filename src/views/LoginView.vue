<script lang="ts">
  import { defineComponent } from "vue";
	import { useUserStore } from "@/stores/userStore";
	import Login from "@/components/Login.vue";

	export default defineComponent({
		components: { Login },

		methods: {
			handleUserLoggedIn(username: string) {
				const userStore = useUserStore();
				userStore.setUsername(username);
				this.$router.push({ name: "home" });
			},
		},
	});
</script>

<template>
	<div class="w-full h-screen">
		<Login @user-logged-in="handleUserLoggedIn" />
	</div>
</template>
