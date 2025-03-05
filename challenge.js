class Challenge {
    constructor(challengeName, goal, description) {
        this.challengeName = challengeName;
        this.goal = goal; // e.g., "Read 5 books"
        this.description = description;
        this.participants = {}; // Stores user progress
    }

    joinChallenge(child) {
        if (!this.participants[child.id]) {
            this.participants[child.id] = 0; // Start progress at 0
            child.challenges.push(this.challengeName);
            return `${child.name} joined "${this.challengeName}" challenge!`;
        }
        return `${child.name} is already in this challenge.`;
    }

    updateProgress(child) {
        if (this.participants[child.id] !== undefined) {
            this.participants[child.id] = child.bookLogs.length; // Track books read
            if (this.participants[child.id] >= this.goal) {
                child.addBadge(this); // Award badge upon completion
                return `${child.name} completed the "${this.challengeName}" challenge and earned a badge!`;
            }
            return `${child.name}'s progress: ${this.participants[child.id]}/${this.goal}`;
        }
        return `${child.name} is not found in this challenge.`;
    }

    getProgress(child) {
        return this.participants[child.id] !== undefined ? this.participants[child.id] : `${child.name} is not found in this challenge.`;
    }
}

// Export for use in other files
if (typeof module !== "undefined") {
    module.exports = Challenge;
}
