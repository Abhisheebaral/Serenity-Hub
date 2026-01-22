import { DailyCheckin } from "../Model/checkinModel.js";
import { Customers } from "../Model/userModel.js"; // make sure this import exists
import dayjs from "dayjs";

export const getTodayCheckin = async (req, res) => {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const customerId = req.user.id;

    // Get today's check-in
    let checkin = await DailyCheckin.findOne({
      where: { customerId, date: today },
    });

    // Get user
    const user = await Customers.findByPk(customerId);

    // Increment streak if not already incremented today
    if (!user.last_streak_date || dayjs(user.last_streak_date).isBefore(today)) {
      user.streak = (user.streak || 0) + 1;
      user.last_streak_date = today;
      await user.save();
    }

    // If today check-in doesn’t exist, create it
    if (!checkin) {
      checkin = await DailyCheckin.create({
        customerId,
        date: today,
      });
    }

    // Return everything, including streak
    res.json({ ...checkin.toJSON(), streak: user.streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTodayCheckin = async (req, res) => {
  try {
    const today = dayjs().format("YYYY-MM-DD");
    const customerId = req.user.id;

    const [_, [updated]] = await DailyCheckin.update(req.body, {
      where: { customerId, date: today },
      returning: true,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
