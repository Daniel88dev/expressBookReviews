const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

//task 6
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
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

//task 5
//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  try {
    const isbnRequested = req.params.isbn; // get ISBN from request params
    const book = books[isbnRequested];

    if (book) {
      const reviews = book.reviews;
      res.json(reviews); // Send the book reviews as JSON
    } else {
      res.status(404).json({ message: "Book not found" }); // Handle book not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving reviews" }); // Handle unknown errors
  }
});

//task 10-13 helper function
// Function to fetch book list using Promise callbacks
function getBookListWithPromise(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
}
//task 10-13 helper function
// Function to fetch book list using async-await
async function getBookListAsync(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for handling in the route
  }
}

//task 10 with Promise
public_users.get("/promise", function (req, res) {
  try {
    getBookListWithPromise("http://localhost:5001/")
      .then((bookList) => {
        res.json(bookList);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error retrieving book list" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
});

//task 10 with Async
public_users.get("/async", async function (req, res) {
  try {
    const bookList = await getBookListAsync("http://localhost:5001/"); //
    res.json(bookList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book list" });
  }
});

//task 11 with Promise
public_users.get("/promise/isbn/:isbn", function (req, res) {
  try {
    const requestedIsbn = req.params.isbn;
    getBookListWithPromise("http://localhost:5001/isbn/" + requestedIsbn)
      .then((book) => {
        res.json(book);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error retrieving book details" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
});
//task 11 with Async
public_users.get("/async/isbn/:isbn", async function (req, res) {
  try {
    const requestedIsbn = req.params.isbn;
    const book = await getBookListAsync(
      "http://localhost:5001/isbn/" + requestedIsbn
    );
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book details" });
  }
});

//task 12 with Promise
public_users.get("/promise/author/:author", function (req, res) {
  try {
    const requestedAuthor = req.params.author;
    getBookListWithPromise("http://localhost:5001/author/" + requestedAuthor)
      .then((book) => {
        res.json(book);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error retrieving book details" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
});
//task 12 with Async
public_users.get("/async/author/:author", async function (req, res) {
  try {
    const requestedAuthor = req.params.author;
    const book = await getBookListAsync(
      "http://localhost:5001/author/" + requestedAuthor
    );
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book details" });
  }
});

//task 13 with Promise
public_users.get("/promise/title/:title", function (req, res) {
  try {
    const requestedTitle = req.params.title;
    getBookListWithPromise("http://localhost:5001/title/" + requestedTitle)
      .then((book) => {
        res.json(book);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error retrieving book details" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected error" });
  }
});
//task 13 with Async
public_users.get("/async/title/:title", async function (req, res) {
  try {
    const requestedTitle = req.params.title;
    const book = await getBookListAsync(
      "http://localhost:5001/title/" + requestedTitle
    );
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving book details" });
  }
});

module.exports.general = public_users;
