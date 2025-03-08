CREATE TABLE Children (
CREATE TABLE Parents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE Children (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    parent_id INTEGER,
    FOREIGN KEY (parent_id) REFERENCES Parents(id)
);

CREATE TABLE Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL
);

CREATE TABLE Books_Read (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER,
    book_id INTEGER,
    date_read DATE,
    FOREIGN KEY (child_id) REFERENCES Children(id),
    FOREIGN KEY (book_id) REFERENCES Books(id)
);

