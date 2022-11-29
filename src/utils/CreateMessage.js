class message {

    constructor(sender, receiver, text, location, timestamp, messageId, photo) {
        this.sender = sender;
        this.receiver = receiver;
        this.text = text;
        this.location = location;
        this.timestamp = timestamp;
        this.messageId = messageId;
        this.photo = '';
    }

}

const CreateMessage = (
    sender,
    receiver,
    text,
    location,
    timestamp,
    messageId,
    photo
) => {
    const newMessage = new message(
        sender,
        receiver,
        text,
        location,
        timestamp,
        messageId,
        photo
    );
    return newMessage;
};

export default CreateMessage;
