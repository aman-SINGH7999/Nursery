import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const UserAddress = sequelize.define("UserAddress", {
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
  address_line1: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  address_line2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  landmark: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING(6),
    allowNull: false,
    validate: {
      is: /^[1-9][0-9]{5}$/,
    },
  },
  address_type: {
    type: DataTypes.ENUM("home", "office", "other"),
    defaultValue: "home",
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "user_address",
  timestamps: true,
});


export default UserAddress;