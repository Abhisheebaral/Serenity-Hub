import { DailyCheckin } from "../Model/checkinModel.js";
import { Sequelize } from "sequelize";

export const getDashboardStats = async (req, res) => {
  const totalCheckins = await DailyCheckin.count({
    where: { customerId: req.user.id },
  });

  const avgMood = await DailyCheckin.findOne({
    attributes: [[Sequelize.fn("AVG", Sequelize.col("mood")), "avgMood"]],
    where: { customerId: req.user.id },
  });

  res.json({
    totalCheckins,
    averageMood: Number(avgMood.dataValues.avgMood || 0).toFixed(1),
  });
};
