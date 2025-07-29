import React, { createContext, useContext, useState } from "react";
import { FriendService } from "../services/friendService";
import type { User } from "../models/user";

interface FriendContextType {
  addFriend: (currUser: User, friend: User) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const FriendContext = createContext<FriendContextType>({
    addFriend: async() => {},
    isLoading: false,
    error: null
});

export const FriendProvider: React.FC<{ children: React.ReactNode }> = ({children,}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFriend = async (currUser: User, friend: User) => {
    setIsLoading(true);
    setError(null);
    try {
      await FriendService.addFriend(currUser, friend);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FriendContext.Provider value={{ addFriend, isLoading, error }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => useContext(FriendContext);