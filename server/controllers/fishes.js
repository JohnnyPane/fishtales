const fishRouter = require("express").Router();
const Fish = require("../models/fish");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const s3 = require('../utils/s3');
const fs = require("fs");


const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    return null;
    };

fishRouter.get("/", async (request, response) => {
    const fishes = await Fish.find({})
    response.json(fishes.map((fish) => fish.toJSON()));
});

fishRouter.post("/", async (request, response) => {
    const body = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    console.log(user._id, "HERE WITH USER BRAH")

    const fish = new Fish({
        species: body.species,
        location: body.location,
        length: body.length,
        weight: body.weight,
        baitType: body.baitType,
        temperature: body.temperature,
        image: body.image,
        date: new Date(),
        user: user._id,
    });

    const savedFish = await fish.save();
    user.fish = user.fish.concat(fish._id);
    await user.save();

    response.json(savedFish);
});

fishRouter.get("/:id", async (request, response) => {
    const fish = await Fish.findById(request.params.id);
    if (fish) {
        response.json(fish);
    } else {
        response.status(404).end();
    }
});

fishRouter.delete("/:id", async (request, response, next) => {
    await Fish.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

fishRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const fish = {
        species: body.species,
        location: body.location,
        length: body.length,
        weight: body.weight,
        baitType: body.baitType,
        temperature: body.temperature,
        image: body.image
    };

    Fish.findByIdAndUpdate(request.params.id, fish, { new: true })
        .then((updatedFish) => {
        response.json(updatedFish.toJSON());
        })
        .catch((error) => next(error));
});

fishRouter.get("/user/:user_id", async (request, response) => {
    const fish = await Fish.find({user: request.params.user_id});
    if (fish) {
        response.json(fish);
    } else {
        response.status(404).end();
  }
});

// fishRouter.post("/image", function (req, res) {
//     console.log(req.files)
//   fs.readFile(req.files.file.path, function (err, data) {
//     s3.s3Upload(data)
//   });
// });

module.exports = fishRouter;