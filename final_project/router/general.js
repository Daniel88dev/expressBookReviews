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

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
