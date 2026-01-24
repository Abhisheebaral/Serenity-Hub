import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

export const Customers = sequelize.define("customers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerUsername: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  customerAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customerContactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customerPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  /* ✅ ADD THIS FOR PROFILE BIO */
  customerBio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
