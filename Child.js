import BookLog from "./BookLog.js";
import Book from "./Book.js"
class Child {
    constructor(name) {
        this.id;
        this.name = name;
        this.currentBooks = [];  // List of Book objects
        this.bookLogs = [];  // List of BookLog objects
        this.totalPagesRead = 0;
    }

    // Add to current books
    addCurrentBook(book) {
        if(book instanceof Book) {
            this.currentBooks.push(book);
        }
        else {
            console.error("Invalid Book object.");
        }
    }

    // add a BookLog entry
    addBooklog(log) {
        if (log instanceof BookLog) {
            this.bookLogs.push(log);
            console.log(`Book log added for ${this.name}: ${log.book}`);
        } else {
            console.error("Invalid BookLog object.");
        }
    }

    // Save all elements of currentBooks array to the backend
    saveCurrentBooks() {
        // Iterate through the currentBooks array
        this.currentBooks.forEach(book => {
            // Call saveBook for each book in the array
            this.saveBook(1, book.id);
        });
        console.log("CurrentBooks saved to backend:", this.currentBooks);
    }

    //Updates current books array
    async updateCurrentBooks() {
        this.currentBooks = [];
        await this.clearChildBooks();
        // Adding books to current books that are in the booklogs array
        for (var i = 0; i < this.bookLogs.length; i++) {
            // Check if the book from bookLogs is already in currentBooks by ID
            if (!this.currentBooks.some(book => book.id === this.bookLogs[i].book.id)) {
                // Add the book to currentBooks if it's not already present
                this.currentBooks.push(this.bookLogs[i].book);
            }
        }
        // Re save updated current books to backend
        this.saveCurrentBooks()
    }

    // Clears the ChildBooks table in the backend
    clearChildBooks() {
        return fetch('http://127.0.0.1:5000/clear_child_books', {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('ChildBooks table cleared in backend:', data);
        })
        .catch(error => console.error('Error clearing ChildBooks table:', error));
    }

    // Remove BookLog
    removeBookLog(startIndex, quant) {
        //Removes log from this.bookLogs array
        this.bookLogs.splice(startIndex, quant);

        // Updates current books array in fronted and clears it in backend
        this.updateCurrentBooks()
        
        // Clear the BookLog table in the backend
        this.clearBookLogs()

        // Re-save the updated bookLogs array to the backend
        .then(() => {
            this.bookLogs.forEach(bookLog => {
                this.saveBookLog(
                    bookLog.book.id, // Book ID
                    1, // Only one child so hardcoded id
                    bookLog.pagesRead,
                    bookLog.timeSpent,
                    bookLog.dateAdded,
                    bookLog.completed
                );
            });
        })
        .catch(error => console.error('Error in removing and saving book logs:', error));

        console.log(`Book log removed for ${this.name}`);
    }

    getTotalPagesRead() {
        this.totalPagesRead = 0;
        for(var i = 0; i < this.bookLogs.length; i++) {
            this.totalPagesRead += this.bookLogs[i].pagesRead;
            console.log(this.bookLogs[i]);
        }
        return this.totalPagesRead;
    }

    //Clears Booklogs table in the backend
    clearBookLogs() {
        return fetch('http://127.0.0.1:5000/clear_book_log', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Book log table cleared in backend:', data);
        })
        .catch(error => console.error('Error clearing book log table:', error));
    }

    // Stores child to SQL table
    saveChild() {
        fetch('http://127.0.0.1:5000/add_child', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Child already exists!") {
                console.log(`Child already exists with ID: ${data.child_id}`);
            } else {
                console.log(`Child added successfully with ID: ${data.child_id}`);
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Stores current book to SQL table
    saveBook(childId, bookId) {
        fetch('http://127.0.0.1:5000/add_child_book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ child_id: childId, book_id: bookId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Book already added to child's current books!") {
                console.log("This book is already associated with the child.");
            } else {
                console.log("Book added to the child's current books successfully!");
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // Stores book log in SQL table
    saveBookLog(bookId, childId, pagesRead, timeSpent, dateAdded, completed) {
        fetch('http://127.0.0.1:5000/add_book_log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                book_id: bookId,
                child_id: childId,
                pages_read: pagesRead,
                time_spent: timeSpent,
                date_added: dateAdded,
                completed: completed,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Book Log Added:', data);
        })
        .catch(error => console.error('Error:', error));
    }

    // Fetches name
    fetchChildDetails(childId) {
        fetch(`http://127.0.0.1:5000/get_child/${childId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    this.name = data.name; // Update child name
                    console.log(`Fetched child details: ${data.name}`);
                }
            })
            .catch(error => console.error('Error fetching child details:', error));
    }

    // Fetches current books and populates this.currentBooks
    fetchChildBooks(childId) {
        fetch(`http://127.0.0.1:5000/get_child_books/${childId}`)
            .then(response => response.json())
            .then(data => {
                this.currentBooks = data.map(book => new Book(
                    book.id, book.title, book.author, book.pages, book.genre, book.band
                ));
                console.log('Fetched current books:', this.currentBooks);
            })
            .catch(error => console.error('Error fetching child books:', error));
    }

    // Fetches log data and populates this.bookLogs
    fetchBookLogs(childId) {
        fetch(`http://127.0.0.1:5000/get_book_logs/${childId}`)
            .then(response => response.json())
            .then(data => {
                this.bookLogs = data.map(log => new BookLog(
                    new Book(
                        log.book_id, log.title, log.author, log.pages, log.genre, log.band
                    ),
                    log.pages_read, log.time_spent, new Date(log.date_added), log.completed
                ));
                console.log('Fetched book logs:', this.bookLogs);
            })
            .catch(error => console.error('Error fetching book logs:', error));
    }

    // Function to display book logs dynamically
    displayBookLogs() {
        const historyContent = document.getElementById("history-content");
        historyContent.innerHTML = ""; // Clear existing logs
    
        this.bookLogs.forEach((log, index) => {
            console.log(log);
            const logEntry = document.createElement("div");
            logEntry.classList.add("log-entry");
    
            const bookTitle = document.createElement("h2");
            bookTitle.textContent = `Book: ${log.book.title}`;
            logEntry.appendChild(bookTitle);
    
            const pagesRead = document.createElement("p");
            pagesRead.textContent = `Pages Read: ${log.pagesRead}`;
            logEntry.appendChild(pagesRead);
    
            const timeSpent = document.createElement("p");
            timeSpent.textContent = `Time Spent: ${log.timeSpent} minutes`;
            logEntry.appendChild(timeSpent);
    
            const dateAdded = document.createElement("p");
            dateAdded.textContent = `Date Added: ${log.dateAdded.toISOString().split('T')[0]}`;
            logEntry.appendChild(dateAdded);
    
            // Add delete button with a bin icon
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = `🗑️`; // Bin icon
            logEntry.appendChild(deleteButton);
    
            // Add event listener to delete the specific log
            deleteButton.addEventListener("click", () => {
                this.removeBookLog(index, 1); // Remove the log from the array
                this.displayBookLogs(); // Re-render the logs
            });
    
            historyContent.appendChild(logEntry);
        });
    };

    // view reading pathway
    viewPathway() {
        return new Pathway(this.bookLogs);
    }
}

export default Child;