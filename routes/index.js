const express = require("express");
const router = express.Router();

let users = [
  {
    id: 0,
    username: "deondre",
    password: "testpass",
  },
];

router.get("/", (req, res) => {
  res.status(200).json({
    message: "GET to API",
    data: JSON.stringify(users),
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);

  // Find the user by id
  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json({
      message: "Get by :id /api",
      data: user,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found",
      data: req.params,
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

router.post("/", (req, res) => {
  const { id, username, password } = req.body;

  const existingUser = users.find((user) => user.id === id);

  if (existingUser) {
    return res.status(400).json({
      message: "User with this ID already exists",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }

  const newUser = { id, username, password };
  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    metadata: {
      hostname: req.hostname,
      method: req.method,
    },
  });
});

router.put("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const { username, password } = req.body;

  // Find the index of the user to update
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    // Update user information
    users[userIndex] = {
      ...users[userIndex],
      username: username || users[userIndex].username,
      password: password || users[userIndex].password,
    };

    res.status(200).json({
      message: "User updated successfully",
      data: users[userIndex],
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

router.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser[0],
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  } else {
    res.status(404).json({
      message: "User not found",
      metadata: {
        hostname: req.hostname,
        method: req.method,
      },
    });
  }
});

module.exports = router;
