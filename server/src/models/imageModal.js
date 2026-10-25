import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Images = sequelize.define('Images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  public_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  is_primary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  alt_text: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
},{
  tableName: 'images',
  timestamps:true,
})

export default Images;