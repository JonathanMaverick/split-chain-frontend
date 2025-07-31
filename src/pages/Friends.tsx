import { UserPlus, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useFriend } from "../contexts/FriendContext";
import { useWallet } from "../contexts/WalletContext";
import type { User } from "../models/user";
import type { Friend } from "../models/friend";
import type { PendingFriend } from "../models/pending-friend";


const Friends = () => {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [friendWalletAddress, setFriendWalletAddress] = useState("");
  const [friendNickname, setFriendNickname] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [tabName, setTabName] = useState('Friends');
  const { accountId } = useWallet();
  const { addFriend, getFriends, getPendingFriends, getPendingRequests, addNickname, acceptRequest, declineRequest } = useFriend();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingFriends, setPendingFriends] = useState<PendingFriend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingFriend[]>([]);
  // const friends = [
  //   {
  //     name: "Alice Johnson",
  //     address: "0.0.12345",
  //     status: "online",
  //   },
  //   {
  //     name: "Bob Smith",
  //     address: "0.0.67890",
  //     status: "offline",
  //   },
  //   {
  //     name: "Carol Davis",
  //     address: "0.0.54321",
  //     status: "online",
  //   },
  // ];

  useEffect(() => {
  if (!errMsg) return;

  const timeout = setTimeout(() => {
    setErrMsg("");
  }, 5000);

  return () => clearTimeout(timeout);
}, [errMsg]);

  useEffect(() => {
    const fetchFriends = async () => {
      const result = await getFriends(accountId!);
      setFriends(result);
    };

    const fetchPendingFriends = async () => {
      const result = await getPendingFriends(accountId!);
      setPendingFriends(result);
    };

    const fetchPendingRequests = async () => {
      const result = await getPendingRequests(accountId!);
      setPendingRequests(result);
    };

    console.log(accountId!);

    fetchFriends();
    fetchPendingFriends();
    fetchPendingRequests();

  }, [accountId!, count]);

  const handleAddFriend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const friendWalletAddress = e.currentTarget.FriendWalletAddress.value;

    const currUser: User = {
      wallet_address: accountId!,
    }

    const friend: User = {
      wallet_address: friendWalletAddress,
    }

    const error = await addFriend(currUser, friend);
    if(error != null){
      setErrMsg(error);
    }
    else {
      setIsOpen(false);
      setErrMsg("");
      setCount((prev) => prev + 1);
    }
  }

  const handleAddNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nickname = e.currentTarget.Nickname.value;
    console.log("Nickname: ", nickname);
    console.log("Friend: ", friendWalletAddress);

    const error = await addNickname(accountId!, friendWalletAddress, nickname);
    if(error != null){
      setErrMsg(error);
    }
    else {
      setIsOpen1(false);
      setErrMsg("");
      setCount((prev) => prev + 1);
    }
  }

  const handleAcceptRequest = async (id: string) => {
    console.log("TES ACCEPT: ", id);
    await acceptRequest(id);
    setCount((prev) => prev + 1);
  }

  const handleDeclineRequest = async (id: string) => {
    console.log("TES DECLINE: ", id);
    await declineRequest(id);
    setCount((prev) => prev + 1);
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Manage Friends
        </h2>
        <p className="text-purple-200 text-lg">
          Add and manage your Split Chain friends
        </p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-75"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-xl p-6 rounded shadow-lg border border-white/10 w-80">
            <h2 className="text-xl font-semibold mb-4 text-white">Add Friend</h2>
            <form onSubmit={handleAddFriend} className="flex flex-col gap-4">
              <label htmlFor="FriendWalletAddress">Friend Wallet Address</label>
              <input type="text" name="FriendWalletAddress" placeholder="Input your Friend Wallet Address" className="bg-purple-800/30 rounded-lg px-4 py-3 text-white"/>
              {errMsg && (
                <div className="text-sm text-red-500 text-center">{errMsg}</div>
              )}
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-purple-600/10 text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-fuchsia-700/50 text-white rounded-lg cursor-pointer">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-75"
            onClick={() => setIsOpen1(false)}
          />
          <div className="relative bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-xl p-6 rounded shadow-lg border border-white/10 w-80">
            <h2 className="text-xl font-semibold mb-4 text-white">Edit Friend Nickname</h2>
            <form onSubmit={handleAddNickname} className="flex flex-col gap-4">
              <label htmlFor="Nickname">Friend Nickname</label>
              <input type="text" name="Nickname" placeholder="Input your Friend Nickname" className="bg-purple-800/30 rounded-lg px-4 py-3 text-white" defaultValue={friendNickname}/>
              {errMsg && (
                <div className="text-sm text-red-500 text-center">{errMsg}</div>
              )}
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  onClick={() => setIsOpen1(false)}
                  className="px-4 py-2 bg-purple-600/10 text-white rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-fuchsia-700/50 text-white rounded-lg cursor-pointer">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">
        <div className="bg-purple-800/30 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-900 p-2 rounded-xl">
              <div className="flex gap-2">
                {tabName == "Friends" ? (
                  <div className="font-semibold bg-fuchsia-900 py-2 px-4 rounded-lg transition duration-200 ease-in-out">Friends</div>
                ) : (
                  <div className="font-semibold py-2 px-4 rounded-xl cursor-pointer" onClick={() => setTabName("Friends")}>Friends</div>
                )}
                {tabName == "Requests" ? (
                  <div className="font-semibold bg-fuchsia-900 py-2 px-4 rounded-lg transition duration-200 ease-in-out flex gap-2">
                    <div>Requests</div>
                    <div>{pendingFriends.length === 0 ? "" : pendingFriends.length}</div>
                  </div>
                ) : (
                  <div className="font-semibold py-2 px-4 rounded-lg cursor-pointer flex gap-2 items-center" onClick={() => setTabName("Requests")}>
                    <div>Requests</div>
                    <div className="text-xs p-2 bg-fuchsia-700/50 rounded-full w-5 h-5 flex items-center justify-center">{pendingFriends.length === 0 ? "" : pendingFriends.length}</div>
                  </div>
                )}
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300" onClick={() => setIsOpen(true)}>
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </button>
          </div>

          {tabName == "Friends" ? (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="text-xl font-semibold">All Friends</div>
                  <div className="space-y-4">
                    {friends.length === 0 ? (
                      <div className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg justify-center">
                        <div className="text-sm text-purple-300">No Data</div>
                      </div>
                    ) : (
                    friends.map((friend, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-semibold text-purple-100">
                              {friend.nickname ?? "-"}
                            </div>
                            <div className="text-sm text-purple-300">
                              {friend.friend_wallet_address}
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-2 bg-green-500/40 rounded-lg cursor-pointer" onClick={() => {
                          setFriendNickname(friend.nickname);
                          setFriendWalletAddress(friend.friend_wallet_address);
                          setIsOpen1(true);
                        }}>Edit</div>
                      </div>
                    )))}
                  </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold">Pending Friends</div>
                <div className="space-y-4">
                    {pendingFriends.length === 0 ? (
                      <div className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg justify-center">
                        <div className="text-sm text-purple-300">No Data</div>
                      </div>
                    ) : (
                    pendingFriends.map((friend, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div>
                            {/* <div className="font-semibold text-purple-100">
                              {friend.nickname ?? "-"}
                            </div> */}
                            <div className="text-sm text-purple-300">
                              {friend.friend_wallet_address}
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm px-3 py-1 rounded-full ${
                          friend.status === "Pending" 
                          ? "bg-yellow-500/20 text-yellow-300" 
                          : "bg-red-800/50 text-red-300"
                        }`}>
                          {friend.status}
                        </div>
                      </div>
                    )))}
                  </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-xl font-semibold">Pending Requests</div>
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg justify-center">
                    <div className="text-sm text-purple-300">No Data</div>
                  </div>
                ) : (
                  pendingRequests.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-purple-900/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="text-sm text-purple-300">
                            {req.user_wallet_address}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="px-3 py-2 bg-green-500/20 rounded-lg cursor-pointer" onClick={() => handleAcceptRequest(req.id)}>Accept</div>
                        <div className="px-3 py-2 bg-red-500/20 rounded-lg cursor-pointer" onClick={() => handleDeclineRequest(req.id)}>Decline</div>
                      </div>
                    </div>
                )))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
