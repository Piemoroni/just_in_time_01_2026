const express = require("express");
const router = express.Router();

const { 
    registrarMovimentacao, 
    listar, 
    buscar 
} = require("../controller/producao.controller");

router.post("/registrar", registrarMovimentacao); //Testado
router.get("/historico", listar); //Testado
router.get("/buscar/:id", buscar); //Testado

module.exports = router;