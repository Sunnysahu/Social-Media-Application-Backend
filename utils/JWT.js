import jwt from 'jsonwebtoken';
import { config } from "dotenv";

config();
function sign(data) {
    const SECRET_KEY = process.env.JWT_SECRET;

    return jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
}

function verify(data) {
    const SECRET_KEY = process.env.JWT_SECRET;

    return jwt.verify(data, SECRET_KEY);
}

export {
    sign,
    verify
}