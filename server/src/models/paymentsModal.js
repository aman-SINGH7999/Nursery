import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const Payments = sequelize.define("Payments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "orders",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  payment_method: {
    type: DataTypes.ENUM("cod", "upi", "card", "netbanking"),
    allowNull: false,
  },
  payment_gateway: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  transaction_id: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "success", "failed", "refunded"),
    defaultValue: "pending",
  },
}, {
  tableName: "payments",
  timestamps: true,
});


export default Payments;