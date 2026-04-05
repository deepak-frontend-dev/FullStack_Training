import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
