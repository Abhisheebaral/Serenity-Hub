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
  customerUsername: {       // now optional for existing rows
    type: DataTypes.STRING,
    allowNull: true,        // <- change to true
    unique: true,
  },
  customerAddress: {
    type: DataTypes.STRING,
    allowNull: true,        // <- match the database
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
});
