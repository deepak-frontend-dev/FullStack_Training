import prisma from "../../prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerService = async (name, email, password) => {
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    });

    if (isUserExist) {
        const error = new Error("User already exists");
        error.status = 400;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return user;
};

export const loginService = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token, user };
};

export const getMeService = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return user;
};
