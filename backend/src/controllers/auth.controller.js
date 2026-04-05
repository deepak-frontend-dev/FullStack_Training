import { registerService, loginService, getMeService } from "../services/auth.service.js";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";

export const register = async (req, res) => {
    const error = validateRegister(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error.join(", ") : error
        });
    }

    const { name, email, password } = req.body;
    const user = await registerService(name, email, password);

    res.status(201).json({ success: true, data: user });
};

export const login = async (req, res) => {
    const error = validateLogin(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error.join(", ") : error
        });
    }

    const { email, password } = req.body;
    const result = await loginService(email, password);

    res.status(200).json({ success: true, data: result });
};

export const getMe = async (req, res) => {
    const user = await getMeService(req.user.id);

    res.status(200).json({ success: true, data: user });
};