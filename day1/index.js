var catMe = require('cat-me');
const { log } = require('console');
console.log(catMe());


const http = require('http');
const server = http.createServer((req,res)=>{
    res.end("Hellow world")
})//server create

server.listen(3000,()=>{
    console.log("Server start at 3000 port")
})