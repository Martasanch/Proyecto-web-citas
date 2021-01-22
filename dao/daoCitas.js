const Cita = require('../models/Cita')
const fs =require("fs")
const daoCitas={}


//funcion para guardar citas
daoCitas.guardar= function guardar(cita){
    return new Promise((resolved,reject)=>{

        //Creamos un array y lo llenamos con lo que tenga el archivo citas
        let citas=[]
        citas=JSON.parse(fs.readFileSync("todascitas.json",  "utf-8"))
        //push
        citas.push(cita)
        //guardamos de nuevo el array en el archivo
       
        fs.writeFile("todascitas.json", JSON.stringify(citas), "utf-8")

    resolved(cita)

    })

}
//funcion para modificar citas

//funcion para buscar citas por id

//funcion para buscar citas por email



module.exports=daoCitas