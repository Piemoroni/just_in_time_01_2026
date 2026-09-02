const { validarCadastro, autenticarUsuario } = require("../services/usuarios.service");
const prisma = require("../data/prisma");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await autenticarUsuario(email, senha);

        res.status(200).json({
            mensagem: "Autenticação realizada com sucesso!",
            usuario
        });
    } catch (erro) {
        res.status(401).json({
            erro: erro.message
        });
    }
};

const cadastrar = async (req, res) => {
    const { nome, email, senha } = req.body;

    const erroValidacao = await validarCadastro(req.body);
    if (erroValidacao) {
        return res.status(400).json({ erro: erroValidacao });
    }

    const usuario = await prisma.usuario.create({
        data: { nome, email, senha }
    });

    res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    });
};

const listar = async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        select: {
            id: true,
            nome: true,
            email: true
        }
    });

    res.status(200).json(usuarios);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            nome: true,
            email: true
        }
    });

    if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.status(200).json(usuario);
};

const logout = async (req, res) => {
    res.status(200).json({
        mensagem: "Logout realizado com sucesso! Redirecionando para tela de login."
    });
};

module.exports = {
    login,
    cadastrar,
    listar,
    buscar,
    logout
};