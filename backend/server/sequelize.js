const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const ProductModel = require("../models/product");
const FriendModel = require("../models/friend");

const sequelize = new Sequelize("food_waste", "AAA", "Aaa@1234#", {
  dialect: "mysql"
});

const User = UserModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const Friend = FriendModel(sequelize, Sequelize);

Product.belongsTo(User);
Product.belongsTo(User, { as: "claimedBy" });
Friend.belongsTo(User);
Friend.belongsTo(User, { as: "friend" });

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })

module.exports = {
  User,
  Product,
  Friend
};
