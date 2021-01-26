const { v4: uuidv4 } = require('uuid')
module.exports=class Cita{

    //constructor
    
        constructor(cita){
            this.nombre=cita.nombre
            this.email=cita.email
            this.telefono=cita.telefono
            this.fecha=cita.fecha
            this.hora=cita.hora
            this.id=uuidv4().substr(-12)
     
     
        }
//metodos privados
    
  //Validar los datos recibidos del formulario

    validar(){
    let errores=[]

    //Validar Nombre
        let nombre = this.nombre
        if (nombre=="") errores.push({ mensaje1: "El campo nombre no puede estar vacío."})

    //Validar email 
        let email=this.email
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        if(emailRegex.test(email)){console.log("El email es correcto.")}
        
        else{errores.push({ mensaje2: "El campo email es incorrecto, introduzca un formato válido."})}

    //Validar Teléfono
        let telefono=this.telefono
        if (telefono=="") errores.push({ mensaje3: "El campo teléfono no puede estar vacío."})

    //Validar fecha 
        let fecha = this.fecha
        let f= new Date()
        let fechaactual=f.getFullYear() + "-0" + (f.getMonth() +1) + "-" + f.getDate()

        if(fecha < fechaactual){errores.push({ mensaje4: "Introduzca una fecha válida: debe ser superior a la fecha actual."})}

        return errores
    }



  
}
    
    