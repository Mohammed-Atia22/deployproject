const pool = require('../db/connect');

const createreview = async (req,res)=>{
    touristid = req.user.userid;
    console.log(req.user.userid);
    const {guideid,comment} = req.body;
    if(!guideid||!comment){
        return res.status(400).json({msg:'your data are uncomplete please provide it'});
    }
    try {
        const review = await pool.query('INSERT INTO review (touristid,guideid,comment) VALUES (?,?,?)',[touristid,guideid,comment])
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json(error);
    }
}    
const getallreviews = async (req,res)=>{ 
    touristid= req.user.userid
    try {
        console.log(req.user.userid);
        const review = await pool.query('SELECT * FROM review WHERE touristid=?',[touristid])
        res.status(200).json(review);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:'there is no card available'});
    }
}
const getreview = async (req,res)=>{
    const id = req.params.id;
    const touristid = req.user.userid;
    try {
        const review = await pool.query('SELECT * FROM review WHERE id=?',[id])
        res.status(200).json(review);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}
const updatereview = async (req,res)=>{
    try {
        const id = req.params.id;
        const touristid = req.user.userid; 
        const {comment} = req.body
        const review = await pool.query('UPDATE review SET comment=? WHERE id = ?',[comment,id])
        res.status(200).json(review);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
}
const deletereview = async (req,res)=>{
    try {
        const id = req.params.id;
        const createdby = req.user.userid;
        const review = await pool.query('DELETE FROM review WHERE id=?',[id])
        res.status(200).json(review);
        console.log(review.affectedRows)
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no job with id ${id}`});
    }
    
}



module.exports = {
    createreview,
    getallreviews,
    getreview,
    updatereview,
    deletereview
}