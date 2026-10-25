import Users from './usersModel.js';
import UserOTP from './otpModel.js';
import UserAddress from './userAddressModal.js';
import AdminLogs from "./adminLogsModal.js";

import Categories from './categoryModal.js';
import Products from './productModal.js';
import Images from "./imageModal.js";
import PlantCareDetail from './plantCareDetailsModal.js';

import Carts from './cartsModal.js';
import Orders from './ordersModal.js';
import OrderItems from './orderItemsModal.js';
import OrderHistory from './orderHistoryModal.js';
import Payments from './paymentsModal.js';

import WishList from './wishlistModal.js';
import Reviews from './reviewsModal.js';
import Blogs from "./blogsModal.js";
import Coupons from './couponsModal.js';


/* ================= USER ASSOCIATIONS ================= */

Users.hasMany(UserAddress, { foreignKey: "user_id", as: "addresses" });
UserAddress.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Orders, { foreignKey: "user_id", as: "orders" });
Orders.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Carts, { foreignKey: "user_id", as: "cart_items" });
Carts.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(WishList, { foreignKey: "user_id", as: "wishlist" });
WishList.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Reviews, { foreignKey: "user_id", as: "reviews" });
Reviews.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Blogs, { foreignKey: "author_id", as: "blogs" });
Blogs.belongsTo(Users, { foreignKey: "author_id" });

Users.hasMany(AdminLogs, { foreignKey: "admin_id", as: "admin_logs" });
AdminLogs.belongsTo(Users, { foreignKey: "admin_id" });


/* ================= CATEGORY & PRODUCT ================= */

Categories.hasMany(Products, { foreignKey: "category_id", as: "products" });
Products.belongsTo(Categories, { foreignKey: "category_id" });

Categories.hasMany(Categories, {
  foreignKey: "parent_id",
  as: "children",
});

Categories.belongsTo(Categories, {
  foreignKey: "parent_id",
  as: "parent",
});


/* ================= PRODUCT DETAILS ================= */

Products.hasMany(Images, { foreignKey: "product_id", as: "images" });
Images.belongsTo(Products, { foreignKey: "product_id" });

Products.hasOne(PlantCareDetail, {foreignKey: "product_id", as: "care_details",});
PlantCareDetail.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(Reviews, { foreignKey: "product_id", as: "reviews" });
Reviews.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(Carts, { foreignKey: "product_id" });
Carts.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(WishList, { foreignKey: "product_id" });
WishList.belongsTo(Products, { foreignKey: "product_id" });

Products.hasMany(OrderItems, { foreignKey: "product_id" });
OrderItems.belongsTo(Products, { foreignKey: "product_id" });


/* ================= ORDERS ================= */

Orders.hasMany(OrderItems, { foreignKey: "order_id", as: "items" });
OrderItems.belongsTo(Orders, { foreignKey: "order_id" });

Orders.hasMany(OrderHistory, { foreignKey: "order_id", as: "history", onDelete: "CASCADE", });
OrderHistory.belongsTo(Orders, { foreignKey: "order_id" });

Orders.hasOne(Payments, { foreignKey: "order_id", as: "payment" });
Payments.belongsTo(Orders, { foreignKey: "order_id" });


UserAddress.hasMany(Orders, {
  foreignKey: "address_id",
  onDelete: "SET NULL",
});

Orders.belongsTo(UserAddress, {
  foreignKey: "address_id",
});



export {
  Users,
  UserOTP,
  UserAddress,
  AdminLogs,
  Categories,
  Products,
  Images,
  PlantCareDetail,
  Carts,
  Orders,
  OrderItems,
  OrderHistory,
  Payments,
  WishList,
  Reviews,
  Blogs,
  Coupons,
};