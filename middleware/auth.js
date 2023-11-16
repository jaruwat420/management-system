import jwt from "jsonwebtoken";
const config = process.env;

const verifyToken = (req, res, next) => {
    try {
        
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'] ;

        if (!token) {
            return res.status(403).send('filed...token is request for authen');
        }

        jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: `Invalid Token ${err}.`
                });
            }

            req.user = decoded.user; 
            return next(); 
        });

    } catch (error) {
        return res.status(401).send(`Invalid Token! ${error}.`);
    }
}

export default verifyToken;