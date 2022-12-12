class FriendRequest {

    constructor(sender, receiver, status, reqeustId) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
        this.requestId = reqeustId;
    }

}

const CreateFriendRequest = (sender, receiver, status, reqeustId) => {
    const newFriendRequest = new FriendRequest(
        sender,
        receiver,
        status,
        reqeustId
    );
    return newFriendRequest;
};
export default CreateFriendRequest;
