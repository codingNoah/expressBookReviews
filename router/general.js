const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Invalid username and/or password" });
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      return res.status(401).json({ message: "Username already used" });
    }
  }
  users.push({ username: username, password: password });
  return res.status(300).json({ message: "registered" });
});

public_users.get("/", function (req, res) {
  return res.status(300).json({ books });
});

public_users.get("/isbn/:isbn", function (req, res) {
  const { isbn } = req.params;

  if (Number(isbn) && 1 <= Number(isbn) && Number(isbn) <= 10) {
    const book = books[Number(isbn)];

    return res.status(200).json(book);
  }

  return res.status(300).json({ message: "No resource" });
});

public_users.get("/author/:author", function (req, res) {
  const { author } = req.params;
  if (!author) {
    return res.status(300).json({ message: "No author" });
  }

  for (let i = 1; i < 11; i++) {
    const book = books[JSON.stringify(i)];
    if (book.author === author) {
      return res.status(200).json({ book });
    }
  }
  return res.status(300).json({ message: "No book" });
});

public_users.get("/title/:title", function (req, res) {
  const { title } = req.params;
  if (!title) {
    return res.status(300).json({ message: "No author" });
  }

  for (let i = 1; i < 11; i++) {
    const book = books[JSON.stringify(i)];
    if (book.title === title) {
      return res.status(200).json({ book });
    }
  }
  return res.status(300).json({ message: "No book" });
});

public_users.get("/review/:isbn", function (req, res) {
  const { isbn } = req.params;

  if (Number(isbn) && 1 <= Number(isbn) && Number(isbn) <= 10) {
    const book = books[Number(isbn)];
    return res.status(200).json(book.reviews);
  }
  return res.status(300).json({ message: "No book" });
});

module.exports.general = public_users;
