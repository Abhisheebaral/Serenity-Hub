import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import "./userModel.js"; // ensure User model is loaded for FK if needed

export const Appointments = sequelize.define(
  "appointments", // lowercase name
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "appointments", // force lowercase table name
    timestamps: true,
  }
);
