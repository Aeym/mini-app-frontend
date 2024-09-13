<script lang="ts">
	import { defineComponent } from "vue";
	import { toast } from "vue3-toastify";

	import FormWrapper from "@/components/common/FormWrapper.vue";
	import InputField from "@/components/common/InputField.vue";
	import { getUserByUsername, createUser } from "@/services/authService";

	export interface FormErrors {
		username: string;
		email: string;
	}

	export default defineComponent({
		components: {
			InputField,
			FormWrapper,
		},

		data(): {
			username: string;
			email: string;
			errors: FormErrors;
			showEmailForm: boolean;
		} {
			return {
				username: "",
				email: "",
				errors: {
					username: "",
					email: "",
				},
				showEmailForm: false,
			};
		},

		emits: ["user-logged-in"],

		methods: {
			async handleSubmit(): Promise<void> {
				await this.submitForm();
			},

			async submitForm(): Promise<void> {
				if (this.showEmailForm) {
					await this.registerUser();
					this.emitUserLoggedIn();
				} else {
					await this.checkUsername();
				}
			},

			async checkUsername(): Promise<void> {
				const user = await getUserByUsername(this.username);
				if (user) {
					this.emitUserLoggedIn();
				} else {
					this.showEmailForm = true;
				}
			},

			async registerUser(): Promise<void> {
				try {
					await createUser({
						username: this.username,
						email: this.email,
					});

				} catch (error) {
					toast.error("Error creating user...")
				}
			},

			emitUserLoggedIn(): void {
				this.$emit("user-logged-in", this.username);
			},
		},

		computed: {
			formButtonText(): string {
				return this.showEmailForm ? "Register" : "Login";
			},
		},
	});
</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
		<FormWrapper
			title="Login or Register"
			:submit="handleSubmit"
			:buttonText="formButtonText"
		>
			<InputField
				id="username"
				label="Enter your username"
				v-model="username"
			/>

			<InputField
				v-if="showEmailForm"
				id="email"
				label="Enter your email"
				v-model="email"
			/>
		</FormWrapper>
	</div>
</template>
