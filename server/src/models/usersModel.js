import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true,
  },
  email:{
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password_reset_token: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password_reset_expires:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  role:{
    type: DataTypes.ENUM("admin", "seller", "customer", "delivery","master_admin"),
    defaultValue: 'customer',
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "blocked"),
    defaultValue: "active",
  },
  profile_pic: {
    type: DataTypes.STRING(255),
    defaultValue: "profile.png",
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default Users;