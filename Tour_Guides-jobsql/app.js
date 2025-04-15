require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const pool = require('./db/connect');
const authuser = require('./routes/user');
const authjob = require('./routes/job');
const authrating = require('./routes/rating');
const authreview = require('./routes/review');
const authimage = require('./routes/image');
const authsearch = require('./routes/search');
const verifyjwt = require('./middlewares/verifyjwt');
const cookieparser = require('cookie-parser');
const path = require('path');
const cors = require('cors');


app.use(express.static(path.join(__dirname,"images")));
app.use(express.json());
app.use(cookieparser());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/refresh',require('./routes/refreshtoken'));

app.use('/api/user' , authuser);
app.use('/refresh',require('./routes/refreshtoken'));
app.use('/logout',require('./routes/logout'));
app.use('/api/job', verifyjwt , authjob);
app.use('/api/rating', verifyjwt , authrating);
app.use('/api/review', verifyjwt , authreview);
app.use('/api/search', verifyjwt , authsearch);
app.use('/api/image', authimage);





const port = 3000;
const start = async ()=>{
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release(); // Release the connection back to the pool
        app.listen(port,()=>{
            console.log(`server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start();