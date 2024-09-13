<script lang="ts">
	import { useRoute } from "vue-router";
	import { defineComponent } from "vue";
	import { toast } from "vue3-toastify";

	import AppButton from "@/components/common/AppButton.vue";
	import Card from "@/components/containers/Card.vue";
	import FormWrapper from "@/components/common/FormWrapper.vue";
	import InputField from "@/components/common/InputField.vue";
	import List from "@/components/common/AppList.vue";
	import MainContainer from "@/components/containers/MainContainer.vue";
	import SimpleModal from "@/components/SimpleModal.vue";
	import {
		Child,
		CreateChildDto,
		DeleteChildDto,
		childService,
	} from "@/services/childService";
	import { useUserStore } from "@/stores/userStore";
	import { useChildCareStore } from "@/stores/childCareStore";

	export default defineComponent({
		components: {
			MainContainer,
			Card,
			SimpleModal,
			FormWrapper,
			InputField,
			List,
			AppButton,
		},
		data() {
			return {
				children: [] as Child[],
				child: <Child>{
					firstname: "",
					lastname: "",
				},
				isModalOpen: false,
				childCareId: "",
			};
		},
		async mounted() {
			const route = useRoute();
			this.childCareId = route.params.id;
			await this.loadChildren();
		},
		methods: {
			async loadChildren(): Promise<void> {
				this.children = await childService.getChildrenByChildCare(
					this.childCareId
				);

				if (this.children === null) {
					toast.error("Error loading children for the nursery...");
				}
			},
			async deleteChildAssignement(childId: number): Promise<void> {
				try {
					const userStore = useUserStore();
					await childService.deleteChildAssignment(<DeleteChildDto>{
						childCareId: this.childCareId,
						childId: childId.toString(),
						username: userStore.username,
					});
					this.children = this.children.filter(
						(child: Child) => childId !== child.id
					);
					toast.success("Child removed from the nursery");
				} catch (error) {
					toast.error("Error removing child from the nursery...");
				}
			},
			async createChild() {
				const newChild = await childService.createChild(
					<CreateChildDto>{
						firstname: this.child.firstname,
						lastname: this.child.lastname,
						childCareId: parseInt(this.childCareId),
					},
					this.getUserName
				);
				if (newChild) {
					this.children.push(newChild);
					this.isModalOpen = false;
					this.child = {
						lastname: "",
						firstname: "",
					};
					toast.success(`${newChild.firstname} added to the nursery !`);
				} else {
					toast.error("Error adding child to the nursery...");
				}
			},
			async exportChildrenOfNursery() {
				await childService.exportChildrenCSV(this.childCareId);
			},
			isUserCanRemoveChild(username: string) {
				return username === this.getUserName;
			},
			openModal() {
				this.isModalOpen = true;
			},
		},
		computed: {
			getUserName() {
				const userStore = useUserStore();
				return userStore.username;
			},
			formatChildrentoListItem() {
				return this.children.map((child: Child) => {
					return {
						id: child.id,
						text: `${child.firstname} ${child.lastname}`,
						username: child.user.username,
					};
				});
			},
			getChildCareName() {
				const childCareStore = useChildCareStore();

				return childCareStore.name;
			},
		},
	});
</script>

<template>
	<MainContainer>
		<Card>
			<div class="flex items-center justify-center relative mb-6 pb-2">
				<AppButton class="absolute left-0" color="grey" @click="$router.back">
					Back
				</AppButton>
				<h1 class="text-xl text-gray-600 font-bold">
					Children of {{ getChildCareName }}
				</h1>
				<AppButton
					class="absolute right-0"
					color="blue"
					@click="exportChildrenOfNursery"
				>
					Export
				</AppButton>
			</div>
			<List :items="formatChildrentoListItem">
				<template #itemDelete="{ item }">
					<AppButton
						v-if="isUserCanRemoveChild(item.username)"
						color="red"
						@click="deleteChildAssignement(item.id)"
					>
						Remove
					</AppButton>
				</template>
			</List>
			<div class="w-full flex justify-center mt-10">
				<AppButton color="blue" @click="openModal"> Create </AppButton>
			</div>
		</Card>
	</MainContainer>
	<SimpleModal v-model="isModalOpen">
		<FormWrapper
			title="Create a child"
			button-text="Create"
			:submit="createChild"
		>
			<InputField id="firstname" label="Firstname" v-model="child.firstname">
			</InputField>
			<InputField id="lastname" label="Lastname" v-model="child.lastname">
			</InputField>
		</FormWrapper>
	</SimpleModal>
</template>
