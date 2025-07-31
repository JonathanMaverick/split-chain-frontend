import React, { createContext, useContext, useState } from "react";
import { FriendService } from "../services/friendService";
import type { User } from "../models/user";
import type { Friend } from "../models/friend";
import type { PendingFriend } from "../models/pending-friend";

interface FriendContextType {
  addFriend: (currUser: User, friend: User) => Promise<string | null>;
  getFriends: (userWalletAddress: string) => Promise<Friend[]>;
  getPendingFriends: (userWalletAddress: string) => Promise<PendingFriend[]>;
  getPendingRequests: (userWalletAddress: string) => Promise<PendingFriend[]>;
  addNickname: (userWalletAddress: string, friendWalletAddress: string, nickname: string) => Promise<string | null>;
  acceptRequest: (id: string) => Promise<void>;
  declineRequest: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const FriendContext = createContext<FriendContextType>({
    addFriend: async() => null,
    getFriends: async() => [],
    getPendingFriends: async() => [],
    getPendingRequests: async() => [],
    addNickname: async() => null,
    acceptRequest: async() => {},
    declineRequest: async() => {},
    isLoading: false,
    error: null
});

export const FriendProvider: React.FC<{ children: React.ReactNode }> = ({children,}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFriend = async (currUser: User, friend: User): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      await FriendService.addFriend(currUser, friend);
      return null;
    } catch (err: any) {
      setError(err.message);
      return err.message;
    } finally {
      setIsLoading(false);
    }
  };

  const getFriends = async (userWalletAddress: string): Promise<Friend[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await FriendService.getFriends(userWalletAddress);
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPendingFriends = async (userWalletAddress: string): Promise<PendingFriend[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await FriendService.getPendingFriends(userWalletAddress);
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPendingRequests = async (userWalletAddress: string): Promise<PendingFriend[]> => {
    setIsLoading(true);
    setError(null);
    try {
      return await FriendService.getPendingRequests(userWalletAddress);
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const addNickname = async (userWalletAddress: string, friendWalletAddress: string, nickname: string): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      await FriendService.addNickname(userWalletAddress, friendWalletAddress, nickname);
      return null;
    } catch (err: any) {
      setError(err.message);
      return err.message;
    } finally {
      setIsLoading(false);
    }
  };

  const acceptRequest = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await FriendService.acceptRequest(id);
      return null;
    } catch (err: any) {
      setError(err.message);
      return err.message;
    } finally {
      setIsLoading(false);
    }
  };

  const declineRequest = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await FriendService.declineRequest(id);
      return null;
    } catch (err: any) {
      setError(err.message);
      return err.message;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FriendContext.Provider value={{ addFriend, getFriends, getPendingFriends, getPendingRequests, addNickname, acceptRequest, declineRequest, isLoading, error }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => useContext(FriendContext);