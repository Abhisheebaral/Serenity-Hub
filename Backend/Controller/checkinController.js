import { DailyCheckin } from "../Model/checkinModel.js";
import { Customers } from "../Model/userModel.js"; 
import dayjs from "dayjs";

/* =========================
   GET TODAY CHECK-IN
========================= */
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

    // ---------------- STREAK AUTO-INCREMENT ----------------
    // Increment streak only if last_streak_date is not today
    if (!user.last_streak_date || dayjs(user.last_streak_date).isBefore(today, "day")) {
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

    // Return check-in + streak
    res.json({ ...checkin.toJSON(), streak: user.streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE TODAY CHECK-IN
========================= */
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
