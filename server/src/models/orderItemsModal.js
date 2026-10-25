import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const OrderItems = sequelize.define("OrderItems", {
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
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "products",
      key: "id",
    },
    onDelete: "RESTRICT",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  price: { // to prevent prices if in future changed
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: "order_items",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["order_id", "product_id"],
    },
  ],
});


export default OrderItems;