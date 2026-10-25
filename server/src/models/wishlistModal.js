import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const WishList = sequelize.define('WishList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
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
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "products",
      key: "id",
    },
    onDelete: "CASCADE",
  }
}, {
  tableName: 'wishlist',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["user_id", "product_id"],
    },
  ],
})

export default WishList;