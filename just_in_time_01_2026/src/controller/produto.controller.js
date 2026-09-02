const { validarDadosProduto } = require("../services/produto.service");
const prisma = require("../data/prisma");

const adicionar = async (req, res) => {
    const erroValidacao = validarDadosProduto(req.body);
    if (erroValidacao) {
        return res.status(400).json({ erro: erroValidacao });
    }

    const produto = await prisma.produto.create({
        data: req.body
    });

    res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        produto
    });
};

const listar = async (req, res) => {
    const { busca } = req.query;

    const filtro = busca ? {
        OR: [
            { nome: { contains: busca } },
            { descricao: { contains: busca } }
        ]
    } : {};

    const produtos = await prisma.produto.findMany({
        where: filtro,
        orderBy: {
            nome: 'asc' // [RF04.1] Ordenação alfabética
        }
    });

    res.status(200).json(produtos);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const produto = await prisma.produto.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.status(200).json(produto);
};

const atualizar = async (req, res) => {
    const { id } = req.params;

    const erroValidacao = validarDadosProduto(req.body);
    if (erroValidacao) {
        return res.status(400).json({ erro: erroValidacao });
    }

    const produto = await prisma.produto.update({
        where: {
            id: Number(id)
        },
        data: req.body
    });

    res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        produto
    });
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const produto = await prisma.produto.delete({
        where: {
            id: Number(id)
        }
    });

    res.status(200).json({
        mensagem: "Produto removido com sucesso!",
        produto
    });
};

module.exports = {
    adicionar,
    listar,
    buscar,
    atualizar,
    excluir
};