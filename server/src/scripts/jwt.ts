import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = (process.env.JWT_SECRET || "") as Secret;

export interface TokenPayload {
    id: number;
    username: string;
}

// Verify the JWT
export const verify_jwt = (token: string): Promise<TokenPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded as TokenPayload);
        });
    });
};

// Sign and Create a new JWT
export const create_jwt = (id: number, username: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign({id, username}, JWT_SECRET, (err: Error | null, encoded?: string) => {
            if (err) reject(err);
            else resolve(encoded as string);
        });
    });
};