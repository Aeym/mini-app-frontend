import apiClient from "./api";

export interface User {
	id: number;
	username: string;
	email: string;
}

export interface CreateUserDto {
	username: string;
	email: string;
}

export const getUserByUsername = async (
	username: string
): Promise<User | null> => {
	try {
		const response = await apiClient.get<User>(`/user/${username}`);
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 404) {
			return null;
		}
		throw error;
	}
};

export const createUser = async (
	createUserDto: CreateUserDto
): Promise<User> => {
	try {
		const response = await apiClient.put<User>("/user", createUserDto);
		return response.data;
	} catch (error) {
		console.error("Failed to create user:", error);
		throw error;
	}
};
