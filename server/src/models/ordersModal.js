import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Orders = sequelize.define("Orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model: "user_address",
      key: "id",
    },
    onDelete: "SET NULL",
  },
  order_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM("cod", "upi", "card", "netbanking"),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
    defaultValue: "pending",
  },
  order_status: {
    type: DataTypes.ENUM(
      "placed",
      "confirmed",
      "packed",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled",
      "returned"
    ),
    defaultValue: "placed",
  },
}, {
  tableName: "orders",
  timestamps: true,
});


export default Orders;