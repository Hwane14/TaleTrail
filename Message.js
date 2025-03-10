class Message {
    constructor(sender, content) {
        this.sender = sender;
        this.content = content;
        this.timestamp = new Date(); // Automatically sets the current time
    }

    formatMessage() {
        return '[${this.timestamp.toLocaleString()}] ${this.sender}: ${this.content}';
    }
}