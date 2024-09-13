<template>
	<transition name="modal-fade">
		<div
			v-if="isOpen"
			class="fixed inset-0 z-50 flex items-center justify-center"
		>
			<div
				class="fixed inset-0 bg-gray-700 bg-opacity-50"
				@click="closeModal"
			></div>

			<div
				class="relative bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md"
				@click.stop
			>
				<button
					class="absolute top-2 right-2 text-gray-500 hover:text-black"
					@click="closeModal"
				>
					X
				</button>
				<slot/>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		props: {
			modelValue: {
				type: Boolean,
				required: true,
			},
		},
		data() {
			return {
				isOpen: <boolean>this.modelValue,
			};
		},
		watch: {
			modelValue(newVal): void {
				this.isOpen = newVal;
			},
		},
		methods: {
			closeModal(): void {
				this.$emit("update:modelValue", false);
			},
		},
	});
</script>

<style scoped>
	.modal-fade-enter-active,
	.modal-fade-leave-active {
		transition: opacity 0.3s;
	}
	.modal-fade-enter,
	.modal-fade-leave-to {
		opacity: 0;
	}
</style>
