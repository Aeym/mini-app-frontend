<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		props: {
			id: {
				type: String,
				required: true,
			},
			modelValue: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			required: {
				type: Boolean,
				default: true
			}
		},
		emits: ["update:modelValue"],
		computed: {
			value: {
				get(): string {
					return this.modelValue;
				},
				set(value: string): void {
					this.$emit("update:modelValue", value);
				},
			},
		},
	});
</script>

<template>
	<label :for="id" class="text-sm text-grey-400">{{ label }}</label>
	<input
		:id="id"
		v-model="value"
		class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
		autocomplete="off"
		:required="required"
	/>
</template>
