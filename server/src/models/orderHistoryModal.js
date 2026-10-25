import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const OrderHistory = sequelize.define("OrderHistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "orders",
      key: "id",
    },
    onDelete: "CASCADE",
  },

  status: {
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
    allowNull: false,
  },

  changed_by: {
    type: DataTypes.ENUM("user", "admin", "system"),
    allowNull: false,
  },

  remark: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: "order_history",
  timestamps: true,
});


export default OrderHistory;