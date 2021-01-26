const Cita = require('../models/Cita')
const fs =require("fs")
const { rejects } = require('assert')
const daoCitas={}


daoCitas.guardar = function guardar(cita){
    return new Promise((resolved, reject) => {
        let citas = []
        fs.readFile('./dao/miscitas.json',(err,data)=>{
            if(err)reject(err)
            if(data!="") citas=JSON.parse(data)
            citas.push(cita)
            fs.writeFile('./dao/miscitas.json', JSON.stringify(citas),(err)=>{
                if(err)reject(err)
                resolved(cita)
          })
       })
    })
}




module.exports=daoCitas