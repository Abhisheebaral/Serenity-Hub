import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";
import { Professionals } from "./professionalModel.js";
import { Customers } from "./userModel.js";

export const Appointments = sequelize.define(
  "appointments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "customer_id"
    },

    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "professional_id"
    },

    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "appointment_date"
    },

    appointmentTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: "appointment_time"
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
    tableName: "appointments",
    timestamps: true,
    underscored: true
  }
);

/* Associations */

Appointments.belongsTo(Professionals, {
  foreignKey: "professionalId",
  as: "professional"
});

Appointments.belongsTo(Customers, {
  foreignKey: "customerId",
  as: "customer"
});