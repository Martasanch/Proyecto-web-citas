const express=require("express")
const app=express()
const rtMain=require("./routes/rtMain")
const rtCitas=require("./routes/rtCitas")




//motor de plantillas handlebars
var exphbs  = require('express-handlebars');

app.engine('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

//middleware
app.use(express.static(__dirname +"/public")) //para mandarle a la carpeta public
app.use(express.urlencoded({extended:true})) //para que reciba la informacion de los formularios
app.use("/",rtMain) //Para todas las rutas principales, con el enroutador rtMain
app.use("/citas",rtCitas) 



//Puerto
app.listen(3000,(err)=>{console.log("Server run on port 3000")})




