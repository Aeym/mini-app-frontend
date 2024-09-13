<script lang="ts">
	import { defineComponent } from "vue";
	import { toast } from "vue3-toastify";

	import AppButton from "@/components/common/AppButton.vue";
	import Card from "@/components/containers/Card.vue";
	import FormWrapper from "@/components/common/FormWrapper.vue";
	import InputField from "@/components/common/InputField.vue";
	import List from "@/components/common/AppList.vue";
	import MainContainer from "@/components/containers/MainContainer.vue";
	import SimpleModal from "@/components/SimpleModal.vue";
	import { useUserStore } from "@/stores/userStore";
	import {
		childCareService,
		ChildCare,
		CreateChildCareDto,
		DeleteChildCareDto,
	} from "@/services/childCareService";
	import { useChildCareStore } from "@/stores/childCareStore";
	import { childService } from "@/services/childService";

	export default defineComponent({
		components: {
			Card,
			FormWrapper,
			InputField,
			List,
			MainContainer,
			SimpleModal,
			AppButton,
		},

		data() {
			return {
				childCares: [] as ChildCare[],
				childCareNameCreation: "",
				isModalOpen: false,
			};
		},

		async mounted() {
			await this.loadChildCares();
		},

		methods: {
			async loadChildCares(): Promise<void> {
				this.childCares = await childCareService.getAllChildCares();

				if (this.childCares === null) {
					toast.error("Error loading nuseries...");
				}
			},

			async createChildCare(): Promise<void> {
				const newChildCare: ChildCare = await childCareService.createChildCare(
					<CreateChildCareDto>{ name: this.childCareNameCreation },
					this.getUserName
				);

				if (newChildCare) {
					this.childCares.push(newChildCare);
					this.isModalOpen = false;
					this.childCareNameCreation = "";
					toast.success(`${newChildCare.name} successfully created !`);
				} else {
					toast.error("Error while creating nursery...");
				}
			},

			async deleteChildCare(id: number): Promise<void> {
				try {
					await childCareService.deleteChildCare(
						<DeleteChildCareDto>{ id: id.toString() },
						this.getUserName
					);
					this.childCares = this.childCares.filter(
						(childCare: ChildCare) => childCare.id !== id
					);
					toast.success("Nursery successfully deleted !");
				} catch {
					toast.error("Error deleting nursery...");
				}
			},
			setChildCareName(name: string): void {
				const childCareStore = useChildCareStore();

				childCareStore.setName(name);
			},
			isUserCanDeleteChildCare(username: string): boolean {
				return username === this.getUserName;
			},
			async exportAllChildren(): Promise<void> {
				try {
					await childService.exportChildrenCSV();
					toast.success("Children data exported successfully!");
				} catch {
					toast.error("Error exporting children data...");
				}
			},
			openModal(): void {
				this.isModalOpen = true;
			},
		},
		computed: {
			formatChildCaresToListItem() {
				return this.childCares.map((childCare: ChildCare) => {
					return {
						id: childCare.id,
						text: childCare.name,
						username: childCare.user.username,
					};
				});
			},
			getUserName() {
				const userStore = useUserStore();
				return userStore.username;
			},
		},
	});
</script>

<template>
	<MainContainer>
		<Card>
			<div class="flex items-center justify-center relative mb-6 pb-2">
				<h1 class="text-xl text-gray-600 font-bold">Nurseries</h1>
				<AppButton
					class="absolute right-0"
					color="blue"
					@click="exportAllChildren"
					>Export</AppButton
				>
			</div>
			<List :items="formatChildCaresToListItem">
				<template #itemAction="{ item }">
					<RouterLink
						class="h-8 min-w-20 flex justify-center items-center bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-400"
						:to="{ path: '/child-care/' + item.id }"
						@click="setChildCareName(item.text)"
					>
						Visit
					</RouterLink>
				</template>
				<template #itemDelete="{ item }">
					<button
						v-if="isUserCanDeleteChildCare(item.username)"
						class="h-8 min-w-20 bg-red-400 text-white text-sm rounded-md hover:bg-red-300"
						@click="deleteChildCare(item.id)"
					>
						Delete
					</button>
				</template>
			</List>
			<div class="w-full flex justify-center mt-10">
				<AppButton color="blue" @click="openModal">Create</AppButton>
			</div>
		</Card>
	</MainContainer>
	<SimpleModal v-model="isModalOpen">
		<FormWrapper
			title="Create a childcare"
			button-text="Create"
			:submit="createChildCare"
		>
			<InputField
				id="firstname"
				label="Firstname"
				v-model="childCareNameCreation"
			>
			</InputField>
		</FormWrapper>
	</SimpleModal>
</template>
