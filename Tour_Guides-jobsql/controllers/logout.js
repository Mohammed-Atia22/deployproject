const pool = require('../db/connect');

const handlelogout = async (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshtoken = cookies.jwt;

    const founduser = await pool.query('SELECT * FROM user WHERE refreshtoken=?',[refreshtoken]);
    if(!founduser[0]){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
        return res.sendStatus(204);
    }
    // founduser.refreshToken = '';
    // const result = await founduser.save();
    const empty = '';
    const modify = await pool.query('UPDATE user SET refreshtoken = ? WHERE id = ?',[empty,founduser[0].id])
    console.log(modify);

    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true});
    res.sendStatus(204);
}

module.exports = {handlelogout}