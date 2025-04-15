const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyjwt = (req,res,next) => {
    const authheader = req.headers.authorization;
    if(!authheader){
        res.status(401).json({ message: 'Unauthorized' });
    }
    //console.log(authheader);
    const token = authheader.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        //console.log(payload)
        req.user = {userid:payload.userid,firstname:payload.firstname,lastname:payload.lastname};
        next();
    } catch (error) {
        res.sendStatus(403).json({error});
    }
}


module.exports = verifyjwt ;