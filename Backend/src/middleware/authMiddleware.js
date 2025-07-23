const jwt = require('jsonwebtoken');
const  authMiddleware =  {   
    protect : async ( req, res, next ) => {
        const token = req.cookies?.jwtToken ;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = user;
            // Handle both {id, ...} and {userDetails: {id, ...}}
            if (user.id && !user._id) {
                req.user._id = user.id;
            } else if (user.userDetails && user.userDetails.id) {
                req.user = user.userDetails;
                req.user._id = user.userDetails.id;
            }
            next();
        } catch (err) {
            console.error(err);
            return res.status(403).json({ message: 'Forbidden' });
        }
    }
}

module.exports = authMiddleware;