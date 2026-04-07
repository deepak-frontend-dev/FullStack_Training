// services/tokenService.js
import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";

const TokenService = {
    setToken(token) {
        Cookies.set(TOKEN_KEY, token, {
            expires: 1,
            secure: true,
            sameSite: "lax",
            path: "/"
        });
    },

    getToken() {
        return Cookies.get(TOKEN_KEY);
    },

    removeToken() {
        Cookies.remove(TOKEN_KEY);
    }
};

export default TokenService;