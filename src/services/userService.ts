import axios from "axios";
import type { User } from "../models/user";

export const UserService = {
  async registerUser(user: User) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        {
          wallet: user.wallet,
        }
      );

      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.error || "Unknown error occurred";
        throw new Error(errorMessage);
      } else {
        throw new Error("Unexpected error");
      }
    }
  },
};
