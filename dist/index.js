"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const express_jwt_1 = require("express-jwt");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.route("/api/login").post(loginRoute);
const RSA_PRIVATE_KEY = fs_1.default.readFileSync("src/private.key");
const checkIfAuthenticated = (0, express_jwt_1.expressjwt)({
    secret: "secret",
    algorithms: ["RS256"],
});
app.route("/api/lessons").get(checkIfAuthenticated); // readAllLessons
function loginRoute(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (true) {
        /*validateEmailAndPassword()*/
        const userId = "123"; /*findUserIdForEmail(email)*/
        const jwtBearerToken = jsonwebtoken_1.default.sign({}, RSA_PRIVATE_KEY, {
            algorithm: "RS256",
            expiresIn: 120,
            subject: userId,
        });
        res.cookie("SESSIONID", jwtBearerToken, { httpOnly: false, secure: false });
        res.status(200).json({
            emailRes: email,
            passwordRes: password
        });
    }
    else {
        res.sendStatus(401);
    }
}
exports.loginRoute = loginRoute;
app.listen(3000);
//# sourceMappingURL=index.js.map