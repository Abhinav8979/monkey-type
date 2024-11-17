const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Optional: Process or upload req.file.buffer to cloud storage (if req.file exists)
    const profileImageBuffer = req.file ? req.file.buffer : null;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user information (modify as needed if storing image elsewhere)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        profileImage: null, // Replace with URL if you upload the image elsewhere
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = { signup };
