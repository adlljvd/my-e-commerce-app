import jwt from "jsonwebtoken";
import * as jose from "jose";

if (!process.env.SECRET_KEY) {
  throw new Error("SECRETKEY is not defined in the environment variables");
}

const privateKey: string = process.env.SECRET_KEY;

function signToken(payload: object) {
  return jwt.sign(payload, privateKey);
}

function verifyToken(token: string) {
  return jwt.verify(token, privateKey);
}

async function verifyTokenJose<T>(token: string) {
  const secretKey = new TextEncoder().encode(privateKey);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
}

export { signToken, verifyToken, verifyTokenJose };
