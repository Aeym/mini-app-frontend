<script lang="ts">
	import { defineComponent } from "vue";
	import { RouterView } from "vue-router";

	import Header from "./components/Header.vue";
	import { useUserStore } from "@/stores/userStore";

	export default defineComponent({
		components: { Header, RouterView },

		computed: {
			isLoggedIn() {
				const userStore = useUserStore();

				return userStore.username !== "";
			},
		},
	});
</script>

<template>
	<div class="bg-gray-100 min-h-screen">
		<Header v-if="isLoggedIn" />
		<RouterView />
	</div>
</template>
