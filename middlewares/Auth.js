import jwt from "jsonwebtoken";

export const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.sendStatus(401);
    console.log("error in this")
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}
