const pool = require('../db/connect');

const createrating = async (req,res)=>{
    touristid = req.user.userid;
    console.log(req.user.userid);
    const {guideid,rating} = req.body;
    if(!guideid||!rating){
        return res.status(400).json({msg:'your data are uncomplete please provide it'});
    }
    try {
        const rating = await pool.query('INSERT INTO rating (touristid,guideid,rating) VALUES (?,?,?)',[touristid,guideid,rating])
        res.status(201).json(rating);
    } catch (error) {
        res.status(500).json(error);
    }
}    
const getallratings = async (req,res)=>{ 
    touristid= req.user.userid
    try {
        console.log(req.user.userid);
        const rating = await pool.query('SELECT * FROM rating WHERE touristid=?',[touristid])
        res.status(200).json(rating);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:'there is no card available'});
    }
}
const getrating = async (req,res)=>{
    const id = req.params.id;
    const touristid = req.user.userid;
    try {
        const rating = await pool.query('SELECT * FROM rating WHERE id=? AND touristid=?',[id,touristid])
        res.status(200).json(rating);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}
const updaterating = async (req,res)=>{
    try {
        const id = req.params.id;
        const touristid = req.user.userid; 
        const {rating} = req.body
        const rating1 = await pool.query('UPDATE rating SET rating=? WHERE id = ?',[rating,id])
        res.status(200).json(rating1);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
}
const deleterating = async (req,res)=>{
    try {
        const id = req.params.id;
        const createdby = req.user.userid;
        const rating = await pool.query('DELETE FROM rating WHERE id=?',[id])
        res.status(200).json(rating);
        console.log(rating.affectedRows)
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
    
}



module.exports = {
    createrating,
    getallratings,
    getrating,
    updaterating,
    deleterating
}