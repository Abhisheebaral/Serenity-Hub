import { DataTypes } from "sequelize";
import { sequelize } from "../Database/db.js";   // ✅ FIX HERE
import { Customers } from "./userModel.js";

export const DailyCheckin = sequelize.define(
  "DailyCheckin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    customerId: {               // ✅ explicitly define FK
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customers,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    mood: {
      type: DataTypes.INTEGER, // 1–5
      defaultValue: 3,
    },

    sleepMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    exerciseMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    meditationMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    gratitude: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    connectedWithSomeone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    spentTimeOutside: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    exercised: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    healthyMeals: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
     thoughtOfTheDay: {
      type: DataTypes.STRING(150),
      defaultValue: "",
    },
  },
 
  {
    tableName: "daily_checkins",
  }
  
);

// Relations
Customers.hasMany(DailyCheckin, { foreignKey: "customerId" });
DailyCheckin.belongsTo(Customers, { foreignKey: "customerId" });
