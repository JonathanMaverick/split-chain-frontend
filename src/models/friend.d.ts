export interface Friend {
    ID: string;
    UserWalletAddress: string;
    FriendWalletAddress: string;
    Nickname: string;
    User: User;
    Friend: User;
}