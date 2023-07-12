const userModel = require('../models/userModel');

// @desc    Add new user
// @rout    POST    /users
// @access  Private
exports.addUser = async (req, res) => {
    const user = new userModel({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    });
    try {
        const newUser = await user.save();
        res.status(201).json({newUser: newUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @desc    Get all users
// @rout    GET    /users
// @access  Public
exports.getUsers = async (req, res) => {
    const users = await userModel.find({});
    res.status(200).json({ UsersNumber: users.length, Users: users });
}

// @desc    Get user by id
// @rout    GET    /user/:id
// @access  Public
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
        res.status(404).json(`No user for this id ${id}`);
    }
    res.status(200).json({ User: user });
}

// @desc    Update a user
// @rout    PUT    /user/:id
// @access  Private
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, role, status } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
        res.status(404).json({ Error: `No Note for this id ${id}` });
    }

    user.name = name;
    user.role = role;
    user.status = status;

    const updatedUser = await user.save();
    res.status(200).send({ User_has_been_updated: updatedUser });
}

// @desc    Delete a user
// @rout    DELETE    /user/:id
// @access  Private
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
        req.status(500).json(`No user for this id ${id}`);
    }
    res.status(200).json('The user has been deleted');
}