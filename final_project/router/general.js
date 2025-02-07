const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
      if (!isValid(username)) {
          users.push({"username":username,"password":password});
          return res.status(200).json({message: "User successfully registered. Now you can login"})
      } else {
          return res.status(400).json({message: "User already exists!"})
      }
  }
  return res.status(404).json({message: "Unable to register user."})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  new Promise((resolve, reject) => {
    res.send(JSON.stringify(books,null,10));
  }).then((successMessage) => {
      req.send(successMessage);
  }).catch((error) => {
      res.send(error);
      return res.status(300).json({message: "Yet to be implemented"});
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  res.send(books[isbn])
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  new Promise((resolve, reject) => {
      for (var key in books) {
          if (books[key].author === author) {
              res.send(books[key]);
          }
      }
  }).then((successMessage) => {
      res.send(successMessage);
  }).catch((error) => {
      res.send(error);
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  new Promise((resolve, reject) => {
      for (var key in books) {
          if (books[key].title === title) {
              res.send(books[key]);
          }
      }
  }).then((successMessage) => {
      res.send(successMessage);
  }).catch((error) => {
      res.send(error);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
