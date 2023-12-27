import { Api } from "../axios-config";

export const userService = {
  async login(email: string, password: string) {
    try {
      const response = await Api.post('login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
