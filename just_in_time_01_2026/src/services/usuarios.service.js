const prisma = require("../data/prisma");

const usuarioExiste = async (email) => {
    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });
    return !!usuario;
};

const validarCadastro = async (dados) => {
    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
        return "Todos os campos (nome, e-mail e senha) são obrigatórios.";
    }

    if (await usuarioExiste(email)) {
        return "Já existe um usuário cadastrado com este e-mail.";
    }

    return null;
};

const autenticarUsuario = async (email, senha) => {
    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }

    const usuario = await prisma.usuario.findUnique({
        where: { email }
    });

    if (!usuario || usuario.senha !== senha) {
        throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
    }

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    };
};

module.exports = {
    usuarioExiste,
    validarCadastro,
    autenticarUsuario
};