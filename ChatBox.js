class Chatbox {
    constructor(id, parent, child) {
        this.id = id;
        this.parent = parent;
        this.child = child;
        this.messages = []; // Array to store messages
    }

    addMessage(message) {
        if (message instanceof Message) {
            this.messages.push(message);
        } else {
            console.error("Invalid message. Must be an instance of Message class.");
        }
    }

    viewMessages() {
        return this.messages.map(msg => msg.formatMessage());
    }
}