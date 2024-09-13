import apiClient from "./api";
import { User } from "./authService";

export interface Child {
	id: number;
	firstname: string;
	lastname: string;
	user: User;
}

export interface CreateChildDto {
	firstname: string;
	lastname: string;
	childCareId: number;
}

export interface DeleteChildDto {
	childCareId: string;
	childId: string;
	username: string;
}

export const childService = {
	async getChildrenByChildCare(childCareId: string): Promise<Child[] | null> {
		try {
			const response = await apiClient.get<Child[]>(
				`/child-care/${childCareId}/children`
			);
			return response.data;
		} catch (error) {
			console.error(
				`Failed to fetch children for child care ID ${childCareId}:`,
				error
			);
			return null;
		}
	},

	async createChild(
		createChildDto: CreateChildDto,
		username: string
	): Promise<Child | null> {
		try {
			const response = await apiClient.post<Child>("/child", createChildDto, {
				headers: { "X-Auth": username },
			});
			return response.data;
		} catch (error) {
			console.error(`Failed to create child for username ${username}:`, error);
			return null;
		}
	},

	async deleteChildAssignment(deleteChildDto: DeleteChildDto): Promise<void> {
		const { childCareId, childId, username } = deleteChildDto;

		try {
			await apiClient.delete(`/child-care/${childCareId}/child/${childId}`, {
				headers: { "X-Auth": username },
			});
		} catch (error) {
			console.error(
				`Failed to delete child assignment for child ID ${childId}:`,
				error
			);
			throw error;
		}
	},

	async exportChildrenCSV(childCareId?: string): Promise<void> {
		try {
			const url = childCareId
				? `/children/export.csv?childCareId=${childCareId}`
				: `/children/export.csv`;

			const response = await apiClient.get(url, {
				responseType: "blob",
			});

			const blob = new Blob([response.data], { type: "text/csv" });

			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = childCareId
				? `children-childCareId-${childCareId}`
				: "children.csv";

			document.body.appendChild(link);
			link.click();

			document.body.removeChild(link);
		} catch (error) {
			console.error("Failed to export children CSV:", error);
			throw error;
		}
	},
};
