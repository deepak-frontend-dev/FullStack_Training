// validators/auth.validator.js
export const validateRegister = ({ name, email, password }) => {
    const error = [];
    if (!name || !name.trim()) error.push("Name is required");
    if (!email || !email.trim()) error.push("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) error.push("Invalid email format");

    if (!password || !password.trim()) error.push("Password is required");
    if (password.length < 6) error.push("Password must be at least 6 characters");

    return error.length > 0 ? error : null;
};

export const validateLogin = ({ email, password }) => {
    const error = [];
    if (!email || !email.trim()) error.push("Email is required");
    if (!password || !password.trim()) error.push("Password is required");
    return error.length > 0 ? error : null;
};