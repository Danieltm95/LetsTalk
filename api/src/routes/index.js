const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  chatRouter  = require("../routes/chatRouter");



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
console.log("entro a router index");
router.use("/chat", chatRouter);


module.exports = router;