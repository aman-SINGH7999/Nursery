import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Coupons = sequelize.define("Coupons", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },

  discount_type: {
    type: DataTypes.ENUM("percentage", "flat"),
    allowNull: false,
  },

  discount_value: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },

  minimum_order_amount: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0,
  },

  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  usage_limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  used_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  status: {
    type: DataTypes.ENUM("active", "inactive", "expired"),
    defaultValue: "active",
  },
}, {
  tableName: "coupons",
  timestamps: true,
});

export default Coupons;
