import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const UserOTP = sequelize.define('UserOTP', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email : {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique:true,
  },
  otp: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
},{
  tableName: 'user_otp',
  timestamps: true,
})


export default UserOTP;