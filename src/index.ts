import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import fs from "fs";
import { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import cors from 'cors';


const app = express();

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.route("/api/login").post(loginRoute);

const RSA_PRIVATE_KEY = fs.readFileSync("src/private.key");

const checkIfAuthenticated = expressjwt({
  secret: "secret",
  algorithms: ["RS256"],
});

app.route("/api/lessons").get(checkIfAuthenticated); // readAllLessons

export function loginRoute(req: express.Request, res: express.Response) {
  const email = req.body.email;
  const password = req.body.password;

  if (true) {
    /*validateEmailAndPassword()*/
    const userId = "123"; /*findUserIdForEmail(email)*/

    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userId,
    });

    res.cookie("SESSIONID", jwtBearerToken, { httpOnly: false, secure: false });
    res.status(200);
  } else {
    res.sendStatus(401);
  }
}

app.listen(3000);
