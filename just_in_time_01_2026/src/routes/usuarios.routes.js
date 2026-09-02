const express = require("express");
const router = express.Router();

const { 
    login, 
    cadastrar,
     listar, 
     buscar, 
     logout } = require("../controller/usuarios.controller");

router.post("/login", login); //Testado
router.post("/cadastrar", cadastrar); //Testado
router.get("/listar", listar); //Testado
router.get("/buscar/:id", buscar); //Testado
router.post("/logout", logout); //Testado

module.exports = router;