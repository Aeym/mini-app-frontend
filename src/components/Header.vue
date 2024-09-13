<script lang="ts">
	import { defineComponent } from "vue";

	import AppButton from "./common/AppButton.vue";
	import { useUserStore } from "@/stores/userStore";

	export default defineComponent({
		components: {
			AppButton,
		},
		methods: {
			logout(): void {
				const userStore = useUserStore();

				userStore.clearUsername();
				this.$router.push("/login");
			},
		},
		computed: {
			getUsername(): string {
				const userStore = useUserStore();

				return userStore.username;
			},
		},
	});
</script>

<template>
	<header
		class="fixed z-10 md:max-w-xl max-w-full w-full mx-auto px-4 md:px-0 left-0 right-0 top-4 backdrop-blur-sm"
	>
		<div
			class="w-full h-20 px-2 md:px-4 flex justify-between items-center rounded bg-blue-500 opacity-80"
		>
			<div class="md:text-xl text-white font-bold">
				{{ getUsername }}
			</div>
			<AppButton color="red" @click="logout"> Logout </AppButton>
		</div>
	</header>
</template>
