const express = require('express');

const app = express();
app.use(express.json())

app.use((req,res,next)=>{

    req.isAuthenticated = !!req.headers.authorization;
    next();
})
app.use('/api.v1', require('./routes'))


const server = app.listen(3001,()=>console.log('mockserver running...'))

module.exports = server;