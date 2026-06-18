const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sendVerificationEmail } = require("../utils/sendMail");

const SALT_ROUNDS = 10;

const authService = {
  register: async (data) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === data.username) {
        throw new Error("Username sudah digunakan");
      }
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    const verificationToken = uuidv4();

    const user = await prisma.user.create({
      data: {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        verificationToken,
      },
    });

    await sendVerificationEmail(user.email, user.fullname, verificationToken);

    const { password, verificationToken: _, ...userWithoutSensitive } = user;
    return userWithoutSensitive;
  },

  login: async (email, password) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Email atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: __, verificationToken, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  verifyEmail: async (token) => {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error("Invalid Verification Token");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });

    return "Email Verified Successfully";
  },
};

module.exports = authService;
