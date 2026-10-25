import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "categories",
      key: "id",
    },
    onDelete: "RESTRICT",
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull:false,
  },
  scientific_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  discounted_price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      min:0,
    }
  },
  type: {
    type: DataTypes.ENUM("plant", "seed", "pot", "fertilizer"),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('small', 'medium', 'large'),
    allowNull: false,
  },
  difficulty_level: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'deleted'),
    defaultValue: 'active',
  },
},{
  tableName: 'products',
  timestamps: true,
})

export default Products;