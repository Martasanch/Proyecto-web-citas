const express= require("express")
const app=express()
const rtMain=express.Router()
const fs =require("fs")



//Aquí te creas las rutas get, post, etc... que necesites



//Rutas de las plantillas hbs

rtMain.get("/", function (req, res){
    res.render("home")
})

//Aquí las validaciones del formulario
rtMain.post("/procesar", function (req, res){


    
   
    const json_citas =fs.readFileSync("miscitas.json",  "utf-8")
    let citas=JSON.parse(json_citas)

    let datosCita={
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    fecha: req.body.fecha,
    hora: req.body.hora,
    }
    
    const json_Arrayfechas =fs.readFileSync("misfechas.json",  "utf-8")
    let Arrayfechas=JSON.parse(json_Arrayfechas)

    let element =  {
    fecha: req.body.fecha,
    hora: req.body.hora,
    }

    console.log(element.fecha)
    console.log(element.hora)

   
    let errores=[]

//Validar Nombre
    let nombre = req.body.nombre
    if (nombre=="") errores.push({ mensaje1: "El campo nombre no puede estar vacío."})

//Validar email 
    let email=req.body.email
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    if(emailRegex.test(email)){console.log("El email es correcto.")}
    
    else{errores.push({ mensaje2: "El campo email es incorrecto, introduzca un formato válido."})}

//Validar Teléfono
    let telefono=req.body.telefono
    if (telefono=="") errores.push({ mensaje3: "El campo teléfono no puede estar vacío."})

//Validar fecha 
    let fecha = req.body.fecha
    let f= new Date()
    
    let fechaactual=f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate() ;
    
    if(fecha < fechaactual){errores.push({ mensaje4: "Introduzca una fecha válida: debe ser superior a la fecha actual."})}

  
    let hora = req.body.hora



if (errores.length!==0) res.render("errores", {errores})


//Comprobar que fecha y hora no se repite


     if(Arrayfechas.includes(element)){
        
        console.log("La fecha ya está reservada")
        res.render("citarepetida", {nombre: nombre, element})

    } 


   let repeticion=[] 
    for (let i = 0; i < Arrayfechas.length; i++) {
       Arrayfechas[i]
       console.log(Arrayfechas[i].fecha)
       console.log(Arrayfechas[i].hora)
        if (Arrayfechas[i].fecha===element.fecha && Arrayfechas[i].hora===element.hora){   
            console.log("La fecha ya está reservada")
            res.render("citarepetida", {nombre: nombre, fecha: fecha, hora: hora})
            repeticion.push( Arrayfechas[i])
            console.log(repeticion)

        }
    }            

    
 
    //Comprobar errores
Validaciones()
function Validaciones(){
    if (errores.length==0 && repeticion.length==0){
        Arrayfechas.push(element)
        citas.push(datosCita)

     

        const json_Arrayfechas= JSON.stringify(Arrayfechas)
        fs.writeFileSync("misfechas.json", json_Arrayfechas, "utf-8")

        const json_citas= JSON.stringify(citas)
        fs.writeFileSync("miscitas.json", json_citas, "utf-8")
        //Enviar datos
        res.render("resultado", {nombre: nombre, fecha:fecha, hora:hora})
    }
  
}

})





module.exports=rtMain






