import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Categories = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "categories",
      key: "id",
    },
    onDelete: "SET NULL",
  },
  image: {
    type: DataTypes.STRING(255),
  },
  image_public_id: {
    type: DataTypes.STRING(255),
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "deleted"),
    defaultValue: "active",
  },
}, {
  tableName: "categories",
  timestamps: true,
});

export default Categories;
