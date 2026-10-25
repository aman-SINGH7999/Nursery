import { sequelize } from "../config/dbConnect.js";
import { DataTypes } from "sequelize";

const PlantCareDetail = sequelize.define('PlantCareDetail', {
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
  sunlight: {
    type: DataTypes.TEXT,
  },
  watering: {
    type: DataTypes.TEXT,
  },
  soil_type: {
    type: DataTypes.TEXT,
  },
  fertilizer: {
    type: DataTypes.TEXT,
  },
  temperature_range: {
    type: DataTypes.STRING(50),
  },
  notes: {
    type: DataTypes.TEXT,
  },
},{
  tableName: 'plant_care_detail',
  timestamps: true,
})

export default PlantCareDetail;