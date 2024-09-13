import apiClient from "./api";
import { User } from "./authService";

export interface ChildCare {
	id: number;
	name: string;
	user: User;
}

export interface CreateChildCareDto {
	name: string;
}

export interface DeleteChildCareDto {
	id: string;
}

export const childCareService = {
	async getAllChildCares(): Promise<ChildCare[]> {
		try {
			const response = await apiClient.get<ChildCare[]>("/child-cares");
			return response.data;
		} catch (error) {
			console.error("Error fetching child cares:", error);
			throw error;
		}
	},

	async createChildCare(
		createChildCareDto: CreateChildCareDto,
		username: string
	): Promise<ChildCare> {
		try {
			const response = await apiClient.post<ChildCare>(
				`/child-care`,
				createChildCareDto,
				{
					headers: {
						"X-Auth": username,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error creating child care:", error);
			return null;
		}
	},

	async deleteChildCare(
		deleteChildCareDto: DeleteChildCareDto,
		username: string
	): Promise<void> {
		try {
			await apiClient.delete(`/child-care/${deleteChildCareDto.id}`, {
				headers: {
					"X-Auth": username,
				},
			});

		} catch (error) {
			console.error("Error deleting child care:", error);
			throw error;
		}
	},
};
