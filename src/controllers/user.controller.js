import { User } from "../models/user.models.js";

const registerUser = async (req, res, next) => {
  try {
    console.log("Received body:", req.body);

    // Ensure request body is not empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Request body is empty" });
    }

    const { name, age, email } = req.body;

    // Validate fields (age should not use trim())
    if (!name?.trim() || !email?.trim() || age === undefined) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields (name, age, email) are required",
        });
    }

    // Check if user already exists
    const existedUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existedUser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with email or username already exists",
        });
    }

    // Create user
    const user = await User.create({ name:name, age, email });

    console.log("User created:", user);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser };
