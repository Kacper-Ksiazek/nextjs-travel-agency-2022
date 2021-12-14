import cookie from "cookie";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

import type { NextApiResponse } from "next";
// .env variables
const SESSION_DURATION = Number(process.env.SESSION_DURATION);
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;
const access_expiration = process.env.ACCESS_TOKEN_EXPIRATION as string;

export default abstract class CookieCreator {
    private readonly PROPERTIES_TO_TOKEN = ["password", "id", "createdAt"];
    private accessToken: string | null = null;

    public constructor(public res: NextApiResponse) {}

    protected createAccessToken(user: User) {
        interface JWTUser {
            [key: string]: "password" | "id" | "createdAt";
        }

        const dataToToken = {} as JWTUser;
        this.PROPERTIES_TO_TOKEN.forEach((prop) => {
            dataToToken[prop] = (user as any)[prop];
        });

        this.accessToken = jwt.sign(dataToToken, access_secret, { expiresIn: access_expiration });
    }

    protected generateCookieHeader(): void {
        this.res.setHeader(
            "Set-Cookie",
            cookie.serialize("accessToken", this.accessToken as string, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24,
            })
        );
    }

    protected createUserSession() {
        return {
            accessToken: this.accessToken as string,
            expires: new Date(Date.now() + SESSION_DURATION),
        };
    }
}
