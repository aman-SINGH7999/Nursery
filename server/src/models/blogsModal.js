import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Blogs = sequelize.define("Blogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },

  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  meta_title: {
    type: DataTypes.STRING(255),
  },

  meta_description: {
    type: DataTypes.STRING(500),
  },

  status: {
    type: DataTypes.ENUM("draft", "published", "private", "deleted"),
    defaultValue: "draft",
  },

  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "users",
      key: "id",
    },
  },

  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "blogs",
  timestamps: true,
});



export default Blogs;