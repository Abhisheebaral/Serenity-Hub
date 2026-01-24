import { Customers } from "../Model/userModel.js";

/* ======================
   GET PROFILE
====================== */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware

    const customer = await Customers.findByPk(userId, {
      attributes: { exclude: ["customerPassword"] },
    });

    if (!customer) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      profile: {
        fullName: customer.customerName,
        username: customer.customerUsername,
        email: customer.customerEmail,
        phone: customer.customerContactNo,
        bio: customer.customerBio,
        memberSince: customer.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================
   UPDATE PROFILE
====================== */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, bio } = req.body;

    await Customers.update(
      {
        customerName: fullName,
        customerContactNo: phone,
        customerBio: bio,
      },
      { where: { id: userId } }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
