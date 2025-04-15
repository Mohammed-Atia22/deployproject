const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connect');
require('dotenv').config();

const register =async (req,res) => {
    const {nationalnum,firstname,lastname,email,upassword,country,imageurl,joineddate,udescription,refreshtoken,phonenum} = req.body;
    if(!nationalnum||!firstname||!lastname||!email||!upassword||!country||!imageurl||!joineddate||!udescription||!phonenum){
        res.status(400).json({msg:'your data are not completed please provide all your data'});
    } else{
        try {
            const dublicate = await pool.query(`SELECT * FROM user WHERE email = ?`,[email])
            if(dublicate[0]) return res.sendStatus(409);
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(upassword,salt);
            const client = await pool.query(`INSERT INTO user (nationalnum,firstname,lastname,email,upassword,country,imageurl,joineddate,udescription,refreshtoken,phonenum) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[nationalnum,firstname,lastname,email,hashedpassword,country,imageurl,joineddate,udescription,refreshtoken,phonenum]);
            const user = await pool.query('SELECT * FROM user WHERE email=?',[email])
            console.log(user[0].id)
            const accesstoken = jwt.sign(
                {userid:user[0].id,firstname:user[0].firstname,lastname:user[0].lastname},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1d'}    // 5minutes
            )
            //console.log(accesstoken)
            // const refreshtoken = jwt.sign(
            //     {firstname:user[0].firstname},
            //     process.env.REFRESH_TOKEN_SECRET,
            //     {expiresIn:'1d'}
            // )
            // console.log(refreshtoken)
            // res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            res.status(201).json({user,accesstoken});
        } catch (error) {
            res.status(500).json(error);
        }
    } 
}
const login = async (req,res)=>{
    const {email,upassword} = req.body;
    if(!email||!upassword){
        return res.status(400).json({msg:'please provide email and password'});
    }
    try {
        const user = await pool.query('SELECT * FROM user WHERE email = ?',[email])
        console.log(user)
        if(!user[0]) return res.sendStatus(401);
        const match = await bcrypt.compare(upassword,user[0].upassword);
        if(match){
            console.log('match')
            const accesstoken = jwt.sign(
                {userid:user[0].id,firstname:user[0].firstname,lastname:user[0].lastname},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1d'}
            );
            console.log(accesstoken)
            const refreshtoken = jwt.sign(
                {userid:user[0].id,firstname:user[0].firstname,lastname:user[0].lastname},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )
            const result = await pool.query('UPDATE user SET refreshtoken = ? WHERE id = ?',[refreshtoken,user[0].id])
            console.log(result)
            const user1 = await pool.query('SELECT * FROM user WHERE id = ?',[user[0].id])
            res.cookie('jwt',refreshtoken,{httpOnly:true,maxAge:24*60*60*1000});
            res.status(200).json({user1,accesstoken});
            //res.status(200).json(user);
        } else {
            return res.status(401).json({msg:'invalid credentials'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
const updateuser = async (req,res)=>{
    try {
        const id = req.params.id;
        const {nationalnum,firstname,lastname,email,upassword,country,imageurl,joineddate,udescription,refreshtoken,phonenum} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(upassword,salt);
        const user = await pool.query('UPDATE user SET email=? , upassword=? , country=? , imageurl=? WHERE id = ?',[email,hashedpassword,country,imageurl,id])
        res.status(200).json({user});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no user with id ${id}`});
    }
}
const deleteuser = async (req,res)=>{
    const id = req.params.id;
    //const createdby = req.user.userid;     ,createdby:createdby
    try {
        const user = await pool.query('DELETE FROM user WHERE id = ?',[id])
        res.status(200).json({user});
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no user with id ${id}`});
    }
    
}



module.exports = {
    register,
    login,
    updateuser,
    deleteuser
}