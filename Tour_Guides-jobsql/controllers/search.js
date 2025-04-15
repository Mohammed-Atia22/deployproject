const pool = require('../db/connect');


const searchcountry = async (req,res)=>{
    const{country} = req.body;
    try {
        const job = await pool.query('SELECT * FROM card WHERE country=? ',[country])
        res.status(200).json(job);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no Job with id ${id}`});
    }
}

const searchcity = async (req,res)=>{
    const{city} = req.body;
    try {
        const job = await pool.query('SELECT * FROM card WHERE city=? ',[city])
        res.status(200).json(job);
    } catch (error) {
        //res.status(500).json(error);
        return res.status(400).json({msg:`there is no card with id ${id}`});
    }
}


module.exports = {
    searchcountry,
    searchcity
}