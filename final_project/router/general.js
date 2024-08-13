const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//task 1
// Get the book list available in the shop
public_users.get("/", function (req, res) {
  try {
    const bookList = books;
    res.json(bookList); // Format JSON output
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

//task 2
// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  try {
    const requestedIsbn = req.params.isbn; // Retrieve ISBN from request params
    const book = books[requestedIsbn];
    if (book) {
      res.json(book); // Send the book details as a JSON response
    } else {
      res.status(404).json({ message: "Book not found" }); // Handle book not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book details" }); // Handle unknown errors
  }
});

//task 3
// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  try {
    const author = req.params.author; // Retrieve author from request
    const filteredBooks = [];

    // Get all book keys
    const bookKeys = Object.keys(books);

    // Loop through books and find a matching author
    for (const key of bookKeys) {
      const book = books[key];
      if (book.author === author) {
        filteredBooks.push(book);
      }
    }

    if (filteredBooks.length > 0) {
      res.json(filteredBooks); // Send matching books as a JSON
    } else {
      res.status(404).json({ message: "No books found by that author" }); // Handle no books found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving books" }); // Handle unexpected errors
  }
});

//task 4
// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  try {
    const requestTitle = req.params.title; // Retrieve title from request params
    const filteredBooks = [];

    // Get all book keys
    const bookKeys = Object.keys(books);

    // Loop through books and find matching title
    for (const key of bookKeys) {
      const book = books[key];
      if (book.title.toLowerCase() === requestTitle.toLowerCase()) {
        // lower-case comparison
        filteredBooks.push(book);
      }
    }

    if (filteredBooks.length > 0) {
      res.json(filteredBooks); // Send matching books as a JSON response
    } else {
      res.status(404).json({ message: "No books found with that title" }); // Handle no book found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving books" }); // Handle unknown errors
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
