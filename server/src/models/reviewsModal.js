import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Reviews = sequelize.define("Reviews", {
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
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "products",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
}, {
  tableName: "reviews",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["user_id", "product_id"],
    },
  ],
});


export default Reviews;