const bcrypt = require("bcrypt");
const { request } = require("express");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
    const body = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      email: body.email,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate('fish', { content: 1, date: 1 })
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const users = await User.findById(request.params.id);
  response.json(users);
});


module.exports = usersRouter;
