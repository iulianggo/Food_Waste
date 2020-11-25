const express = require("express");
const bodyParser = require("body-parser");
const { User, Product, Friend } = require("./sequelize");

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// API ENDPOINTS

const port = 8080;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

//USERS
app.post("/api/users", (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  }).then(user => res.json(user));
});
app.get("/api/users", (req, res) => {
  User.findAll({ attributes: ["id", "email"] }).then(users => res.json(users));
});
app.post("/api/users/login", (req, res) => {
  User.findAll({
    where: {
      email: req.body.email
    }
  }).then(users => {
    let user = users[0];
    if (user.password == req.body.password) {
      res.json(user.id);
    } else {
      res.json(-1);
    }
  });
});
app.post("/api/users/invites", (req, res) => {
  Friend.findAll({
    where: {
      friendId: req.body.friendId,
      invited: true
    }
  }).then(async friends => {
    let arr = [];

    for (let i = 0; i < friends.length; i++) {
      let users = await User.findAll({
        attributes: ["id", "email"],
        where: {
          id: friends[i].userId
        }
      });

      arr.push({
        userId: users[0].email.id,
        email: users[0].email
      });

      if (i == friends.length - 1) {
        res.json(arr);
      }
    }
  });
});

//PRODUCTS
app.post("/api/products", (req, res) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    valability: req.body.valability,
    userId: req.body.userId
  }).then(product => res.json(product));
});
app.get("/api/products", (req, res) => {
  Product.findAll().then(products => res.json(products));
});
app.post("/api/products/available", (req, res) => {
  Product.findAll({
    where: {
      id: req.body.id
    }
  }).then(products => {
    let product = products[0];
    product.update({
      isAvailable: req.body.isAvailable
    });
  });
});
app.post("/api/products/claim", (req, res) => {
  Product.findAll({
    where: {
      id: req.body.id
    }
  }).then(products => {
    let product = products[0];
    product.update({
      claimedById: req.body.claimedById
    });
  });
});
app.post("/api/products/user", (req, res) => {
  Product.findAll({
    where: {
      userId: req.body.userId
    }
  }).then(async products => {
    let arr = [];

    for (let i = 0; i < products.length; i++) {
      let users;
      if (products[i].claimedById != undefined) {
        users = await User.findAll({
          attributes: ["email"],
          where: {
            id: products[i].claimedById
          }
        });
      }

      if (users == undefined) {
        users = [];
        users.push({
          email: " "
        });
      }

      arr.push({
        id: products[i].id,
        name: products[i].name,
        description: products[i].description,
        category: products[i].category,
        valability: products[i].valability,
        isAvailable: products[i].isAvailable,
        claimedById: products[i].claimedById,
        claimedBy: users[0].email
      });

      if (i == products.length - 1) {
        res.json(arr);
      }
    }
  });
});
app.post("/api/products/user/available", (req, res) => {
  Product.findAll({
    where: {
      userId: req.body.userId,
      isAvailable: true
    }
  }).then(products => res.json(products));
});

//Friend
app.post("/api/friend", (req, res) => {
  if (req.body.type == 1) {
    Friend.create({
      userId: req.body.userId,
      friendId: req.body.friendId
    }).then(friend => res.json(friend));
  } else {
    Friend.destroy({
      where: {
        id: req.body.id
      }
    });
  }
});
app.post("/api/friend/invite", (req, res) => {
  Friend.findAll({
    where: {
      id: req.body.id
    }
  }).then(friends => {
    let friend = friends[0];
    friend.update({
      invited: req.body.invited
    });
  });
});
app.post("/api/friend/user", (req, res) => {
  Friend.findAll({
    where: {
      userId: req.body.userId
    }
  }).then(async friends => {
    let arr = [];

    for (let i = 0; i < friends.length; i++) {
      let users = await User.findAll({
        attributes: ["email"],
        where: {
          id: friends[i].friendId
        }
      });

      arr.push({
        id: friends[i].id,
        friendId: friends[i].friendId,
        category: friends[i].category,
        invited: friends[i].invited,
        email: users[0].email
      });

      if (i == friends.length - 1) {
        res.json(arr);
      }
    }
  });
});
app.post("/api/friend/user/invited", (req, res) => {
  Friend.findAll({
    where: {
      friendId: req.body.friendId,
      invited: true
    }
  }).then(async friends => {
    let arr = [];

    for (let i = 0; i < friends.length; i++) {
      let users = await User.findAll({
        attributes: ["email"],
        where: {
          id: friends[i].userId
        }
      });

      arr.push({
        friendId: friends[i].userId,
        email: users[0].email
      });

      if (i == friends.length - 1) {
        res.json(arr);
      }
    }
  });
});
app.post("/api/friend/category", (req, res) => {
  Friend.findAll({
    where: {
      id: req.body.id
    }
  }).then(friends => {
    let friend = friends[0];
    friend.update({
      category: req.body.category
    });
  });
});
