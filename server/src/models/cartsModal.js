import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Carts = sequelize.define('Carts', {
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
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "products",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
      validate: {
      min: 1,
    },
  }
},{
  tableName: 'carts',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["user_id", "product_id"],
    },
  ],
})

export default Carts;