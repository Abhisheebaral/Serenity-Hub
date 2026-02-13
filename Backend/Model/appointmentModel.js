import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";

// Define the Appointments model
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
  },
  {
    tableName: "appointments", // force lowercase table name
    timestamps: true,
  }
);

