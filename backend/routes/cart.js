const router = require("express").Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth");

// put book to cart
router.put("/add-to-cart",authenticateToken, async (req,res) => {
    try {
        const {book_id,id} = req.headers;
        const userData = await User.findById(id);   
        const isBookinCart = userData.cart.includes(book_id);
        if (isBookinCart){
            return res.json({
                status: "Success",
                message: "Book is already in cart", 
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: book_id },
        });

        return res.json({
            status: "Success",
            message: "Book added to cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});
// remove from cart
router.put("/remove-from-cart/:book_id",authenticateToken, async (req,res) => {
    try {
        const {book_id} = req.params;
        const {id} =req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: {cart: book_id},
        });

        return res.json({
            status: "Success",
            message: "Book removed from cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});
// cart of particular user
router.get("/get-user-cart",authenticateToken, async (req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");   //
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart, 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "An error occured."});
    }
});
module.exports = router;