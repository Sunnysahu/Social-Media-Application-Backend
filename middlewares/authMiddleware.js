import { apiError } from "../utils/apiError.js";
import { verify } from "../utils/JWT.js";

const isLogged = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json(new apiError(401, ["Token Not Found"], "Please Login to get the access"));
    }


    const user = verify(token.replace("Bearer ", ""));

    if(!user) {
        return res.json(new apiError(401, ["Token Not Found"], "Please Login to get the access"));
    }

    req.user = user;

    next();
}

export {
    isLogged
}