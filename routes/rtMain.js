const express= require("express")

const rtMain=express.Router()





//Mover entre plantillas hbs

rtMain.get("/", function (req, res){
    res.render("home")
})



module.exports=rtMain

