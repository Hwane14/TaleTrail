class Child {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.parents = [];  // List of Parent objects
        this.currentBooks = [];  // List of Book objects
        this.bookLogs = [];  // List of BookLog objects
        this.badgesEarned = [];  // List of Badge objects
    }

    // add a BookLog entry
    addBooklog(log) {
        if (log instanceof BookLog) {
            this.bookLogs.push(log);
            console.log(`Book log added for ${this.name}: ${log.bookTitle}`);
        } else {
            console.error("Invalid BookLog object.");
        }
    }

    // view reading pathway
    viewPathway() {
        return new Pathway(this.bookLogs);
    }

    // add a badge earned from a challenge
    addBadge(challenge) {
        if (challenge instanceof Challenge) {
            this.badgesEarned.push(new Badge(challenge.name, challenge.description));
            console.log(`Badge earned for ${this.name}: ${challenge.name}`);
        } else {
            console.error("Invalid Challenge object.");
        }
    }
}

// Export for use in other files (if using modules)
if (typeof module !== "undefined") {
    module.exports = Child;
}
