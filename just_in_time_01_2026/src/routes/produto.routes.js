const express = require("express");
const router = express.Router();

const { 
    adicionar,
    listar, 
    buscar, 
    atualizar, 
    excluir 
} = require("../controller/produto.controller");

router.post("/cadastrar", adicionar); //Testado
router.get("/listar", listar); //Testado
router.get("/buscar/:id", buscar); //Testado
router.put("/atualizar/:id", atualizar); //Testado
router.delete("/excluir/:id", excluir); //Testado

module.exports = router;