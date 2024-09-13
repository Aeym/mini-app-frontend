<template>
	<div class="w-full flex flex-col items-center">
		<ul class="w-full">
			<li v-for="item in items" :key="item.id">
				<div class="md:w-3/4 w-full mb-2 md:mb-0">{{ item.text }}</div>
				<div class="md:w-1/4 w-full h-full flex justify-around items-center">
					<div class="min-w-20">
						<slot name="itemAction" :item="item" />
					</div>
					<div class="min-w-20">
						<slot name="itemDelete" :item="item" />
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";

	export interface ListItem {
		id: number;
		text: string;
	}

	export default defineComponent({
		props: {
			items: {
				type: Array as PropType<ListItem[]>,
				required: true,
			},
		},
	});
</script>

<style>
	li {
		@apply w-full min-h-16 mt-1 px-4 py-2 md:py-0 flex flex-col md:flex-row
	 	items-center list-none even:bg-gray-200 odd:bg-gray-100 shadow-sm;
	}
</style>
