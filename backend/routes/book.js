const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");// json web token
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
//const { response } = require("express");

//adding book --admin
router.post("/add-book", authenticateToken, async (req,res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role != "admin") {
            return res
            .status(400)
            .json({message: "You dont have Access to the Database."});
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        }); 
        await book.save();
        res.status(200).json({message: "Book added sucessfully."});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

//Update book
router.put("/update-book", authenticateToken, async (req,res) => {
    try {
        const {book_id} = req.headers;
        await Book.findByIdAndUpdate(book_id, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        }); 

        return res.status(200).json({message: "Book updated sucessfully."});
    } catch (error) {
        return res.status(500).json({message: "An error occurred"});
    }
});

//deleting book
router.delete("/delete-book", authenticateToken, async (req,res) => {
    try {
        const {book_id} = req.headers;
        await Book.findByIdAndDelete(book_id); 
        return res.status(200).json({message: "Book deleted sucessfully."});
    } catch (error) {
        return res.status(500).json({message: "An error occurred"});
    }
});

//get all books
router.get("/get-all-books", async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
        status: "Success",
        data: books, 
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});

//get 4 recent four books
router.get("/get-recent-books", async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
        status: "Success",
        data: books, 
    });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});

//get book by ID
router.get("/get-book-by-id/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const books = await Book.findById(id);
        return res.json({
            status: "Success",
            data: books, 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});

module.exports = router;