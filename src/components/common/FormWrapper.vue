<template>
	<div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
		<h2 class="text-2xl font-semibold text-center mb-4">{{ title }}</h2>
		<form @submit.prevent="submit">
			<slot />
			<button
				type="submit"
				class="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500"
			>
				{{ buttonText }}
			</button>
		</form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		props: {
			title: {
				type: String,
				required: true,
			},
			buttonText: {
				type: String,
				required: true,
			},
			submit: {
				type: Function as unknown as () => (event: SubmitEvent) => void,
				required: true,
			},
		},
	});
</script>
