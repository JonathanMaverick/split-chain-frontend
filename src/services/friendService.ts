import axios from "axios";
import type { User } from "../models/user";
import type { Friend } from "../models/friend";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}${
  import.meta.env.VITE_API_VERSION
}`;

export const FriendService = {
  async addFriend(currUser: User, friend: User) {
    try {
      const response = await axios.post(`${BASE_URL}/add`, {
        friend_wallet_address: friend.wallet_address,
        user_wallet_address: currUser.wallet_address,
      });
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
