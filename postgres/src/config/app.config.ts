import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;

// secret key for jwt token
export const SECRET_KEY = <string>process.env.SECKRET_KEY;
