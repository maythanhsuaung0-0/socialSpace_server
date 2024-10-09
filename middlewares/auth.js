import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const vToken = (req, res, next) => {
    try{
        const accessToken = req.header("authorization").split(" ")[1];
        if(!accessToken){
            return res.sendStatus(401);
        }
        const payload = jwt.verify(accessToken, process.env.APP_SECRET);
        req.user = payload
        return next();
    }
    catch(err){
        return res.sendStatus(401);
    }
}

export default vToken;