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
    
  //Validar y crear la cita




  
}
    
    