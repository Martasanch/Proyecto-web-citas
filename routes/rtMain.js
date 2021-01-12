const express= require("express")
const app=express()
const rtMain=express.Router()
const fs =require("fs")
const QRCode = require('qrcode')
const { v4: uuidv4 } = require('uuid')

let citas=JSON.parse(fs.readFileSync("miscitas.json",  "utf-8"))


//Rutas de las plantillas hbs

rtMain.get("/", function (req, res){
    res.render("home", {citas})
})

rtMain.get("/modificarcita", function (req, res){
    res.render("modificarcita", {citas})
})

rtMain.get("/vercita", function (req, res){
    res.render("vercita", {citas})
})



//Aquí las validaciones de id

rtMain.post("/modificar", function (req, res){

    
    let miId=req.body.id
    let citaIdentificada=[]
    
    for (let i = 0; i < citas.length; i++) {
    
        if (citas[i].id==miId){   
            console.log("el id es correcto")
            citaIdentificada.push=citas[i]
            
            let fecha=citas[i].fecha
            let hora=citas[i].hora
            let nombre=citas[i].nombre
            res.render("eliminar", {fecha , hora, nombre})

                //Elimino la cita
                rtMain.get("/citaeliminada", function (req, res){
                   citas.splice(i)
                   console.log(citas)
                    res.render("citaeliminada")
    
                    })
        
        }
        else console.log("el id no es correcto")
    }            


})

//Aquí las validaciones del formulario
rtMain.post("/procesar", function (req, res){

 

  

    let datosCita={
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    fecha: req.body.fecha,
    hora: req.body.hora,
    }
    let id= uuidv4()
    console.log(id)
    datosCita.id = id.substr(-12)
    console.log(datosCita)


  
   
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
    
    let fechaactual=f.getFullYear() + "-0" + (f.getMonth() +1) + "-" + f.getDate()
    console.log(fechaactual)
    
    if(fecha < fechaactual){errores.push({ mensaje4: "Introduzca una fecha válida: debe ser superior a la fecha actual."})}

  
    let hora = req.body.hora

//Enviar errores

if (errores.length!==0) res.render("errores", {errores})


//Comprobar que fecha y hora no se repite

   let repeticion=[] 
    for (let i = 0; i < citas.length; i++) {
    
        if (citas[i].fecha==datosCita.fecha && citas[i].hora===datosCita.hora){   
            console.log("La fecha ya está reservada")
            res.render("citarepetida", {nombre, fecha, hora})
            repeticion.push( citas[i])
            console.log(repeticion)

        }
    }            

    
 
//Validar y crear la cita
Validaciones()
function Validaciones(){
    if (errores.length==0 && repeticion.length==0){
        
        citas.push(datosCita)

     


        const json_citas= JSON.stringify(citas)
        fs.writeFileSync("miscitas.json", json_citas, "utf-8")
        //Enviar datos
        res.render("resultado", {datosCita})
    }
  
}

})


rtMain.get('/modificarcita/:id', (req,res)=>{
    let id=req.params.id
    res.send("Ha seleccionado modificar la cita " + id)
})


module.exports=rtMain



//EJERCICIO 3: En el ejercicio de citas, añadir el campo HORARIO para elegir la hora de la reserva. Cuando alguien seleccione un día en el calendario, deberán cargarse SÓLAMENTE LAS HORAS QUE ESTÁN LIBRES ESE DÍA en el campo HORARIO.



