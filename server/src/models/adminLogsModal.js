import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const AdminLogs = sequelize.define("AdminLogs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "users",
      key: "id",
    },
  },

  action: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  entity_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: "users, products, orders, coupons etc",
  },

  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  meta: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: "admin_logs",
  timestamps: true,
});

export default AdminLogs;
