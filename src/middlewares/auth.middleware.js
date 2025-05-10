const jwt = require('jsonwebtoken');
//midleware for verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "invalid token" });
    }

}

const verifyRole = (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        }
        else {
            res.status(403).json({ message: "Forbidden" });
        }
    }
    
}

module.exports = { verifyToken, verifyRole };