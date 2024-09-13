<script lang="ts">
	export default {
		emits: ["click"],
		props: {
			color: {
				type: String,
				default: "grey",
				validator: (value: string) => ["blue", "red", "grey"].includes(value),
			},
		},
		data() {
			return {
				isDisabled: false,
			};
		},
		methods: {
			async handleClick() {
				if (this.isDisabled) return;

				this.isDisabled = true;
				this.$emit("click");

				setTimeout(() => {
					this.isDisabled = false;
				}, 1000);
			},
		},
		computed: {
			buttonClasses(): string {
				switch (this.color) {
					case "blue":
						return "h-8 min-w-20 bg-blue-500 text-white rounded-md hover:bg-blue-400";
					case "red":
						return "h-8 min-w-20 bg-red-500 text-white rounded-md hover:bg-red-400";
					case "grey":
					default:
						return "h-8 min-w-20 bg-gray-400 text-white rounded-md hover:bg-gray-300";
				}
			},
		},
	};
</script>

<template>
	<button :class="buttonClasses" :disabled="isDisabled" @click="handleClick">
		<slot>Button</slot>
	</button>
</template>
