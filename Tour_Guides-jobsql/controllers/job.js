const pool = require('../db/connect');

const createjob = async (req,res)=>{
    createdby = req.user.userid;
    console.log(req.user.userid);
    createdby = req.user.userid
    const {gender,country,city,phonenum,email,flanguage,slanguage,sdate,edate} = req.body;
    if(!gender||!country||!city||!phonenum||!email||!flanguage||!slanguage||!sdate||!edate){
        return res.status(400).json({msg:'your data are uncomplete please provide it'});
    }
    try {
        const job = await pool.query('INSERT INTO card (createdby,gender,country,city,phonenum,email,flanguage,slanguagew,sdate,edate) VALUES (?,?,?,?,?,?,?,?,?,?)',[createdby,gender,country,city,phonenum,email,flanguage,slanguage,sdate,edate])
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json(error);
    }
}    
const getalljobs = async (req,res)=>{ 
    createdby = req.user.userid
    try {
        console.log(req.user.userid);
        const job = await pool.query('SELECT * FROM card WHERE createdby=?',[createdby])
        res.status(200).json(job);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:'there is no card available'});
    }
}
const getjob = async (req,res)=>{
    const id = req.params.id;
    const createdby = req.user.userid;
    try {
        const job = await pool.query('SELECT * FROM card WHERE id = ? AND createdby = ?',[id,createdby])
        res.status(200).json(job);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}
const updatejob = async (req,res)=>{
    try {
        const id = req.params.id;
        const createdby = req.user.userid; 
        const {phonenum,email,sdate,edate,cost} = req.body
        const job = await pool.query('UPDATE card SET phonenum=? , email=? , sdate=? , edate=? , cost=? WHERE id = ? AND createdby = ? ',[phonenum,email,sdate,edate,cost,id,createdby])
        res.status(200).json(job);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
}
const deletejob = async (req,res)=>{
    try {
        const id = req.params.id;
        const createdby = req.user.userid;
        const job = await pool.query('DELETE FROM card WHERE id=? AND createdby=?',[id,createdby])
        res.status(200).json(job);
        console.log(job.affectedRows)
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
    
}



module.exports = {
    createjob,
    getalljobs,
    getjob,
    updatejob,
    deletejob
}