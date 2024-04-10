import jwt from 'jsonwebtoken';

export function generateAccessToken(username) {
    const payload = { username }
    const expiresInSec = 18000; // 5 hours
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiresInSec });
}

export function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    // const AuthToken = authHeader && authHeader.split(' ')[1];
    const token = req.params.token
    console.log(token)
    if (token == null) return res.sendStatus(401);
    console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, username) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if the token is invalid
        }

        req.user = username;
        next();
    });
}

