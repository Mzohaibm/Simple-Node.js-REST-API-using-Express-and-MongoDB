const express = require("express");
const userRouter = express.Router();
const users = require("../models/user"); 

userRouter.route("/").get(async (req, res) => {
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.post("/", async (req, res) => {
    const user = new users({
        name: req.body.name,
        age: req.body.age,
        salary: req.body.salary,
        fees: req.body.fees,
        books: req.body.books,
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
async function singleUsers(req, res, next) {
    console.log("Middleware executed");
    let user;
    try {
        user = await users.findById(req.params.id);
        if (user === null) {
            return res.status(404).json({ message: 'Sorry, cannot find' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
}

userRouter
    .route("/:id")
    .get(singleUsers, (req, res) => {
        res.json(res.user);
    })
    .patch(singleUsers, async (req, res) => {
        if (req.body.name !== null) {
            res.user.name = req.body.name;
        }
        if (req.body.age !== null) {
            res.user.age = req.body.age;
        }
        try {
            const updatedUser = await res.user.save();
            res.json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .delete(singleUsers, async (req, res) => {
        try {
            const result = await users.deleteOne({ _id: res.user._id });
            if (result.deletedCount > 0) {
                res.json({ message: "Deleted subscriber" });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

module.exports = userRouter;
