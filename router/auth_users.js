const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let truth = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      truth = true;
      break;
    }
  }
  return truth;
};

const authenticatedUser = (username, password) => {
  let truth = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username) {
      if (users[i].password === password) {
        truth = true;
        break;
      } else {
        truth = false;
        break;
      }
    }
  }
  return truth;
};

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      const token = jwt.sign(
        { username: username, password: password },
        "fingerprint_customer"
      );
      return res.status(200).json({ token });
    }
  }

  return res.status(300).json({ message: "Please register" });
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  return res.status(300).json({ message: "Yet to be implemented" });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  if (Number(isbn) && 1 <= Number(isbn) && Number(isbn) <= 10) {
    const book = books[isbn];
    delete book.reviews;
    return res.status(200).json({ message: "successful" });
  }
  return res.status(300).json({ message: "Unsuccessful" });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
