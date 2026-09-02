const { processarMovimentacao } = require("../services/producao.service");
const prisma = require("../data/prisma");

const registrarMovimentacao = async (req, res) => {
    const { usuarioId, produtoId, tipo, qntd, dados } = req.body;

    // Validação de presença e tipo numérico das chaves
    if (!usuarioId || !produtoId || !tipo || !qntd) {
        return res.status(400).json({
            erro: "Campos obrigatórios: usuarioId, produtoId, tipo e qntd."
        });
    }

    if (isNaN(usuarioId) || isNaN(produtoId) || isNaN(qntd) || Number(qntd) <= 0) {
        return res.status(400).json({
            erro: "Os campos usuarioId, produtoId e qntd devem ser números válidos maiores que zero."
        });
    }

    try {
        // Executa a lógica de atualização no banco via Service
        const resultado = await processarMovimentacao(produtoId, tipo, qntd);

        // Registra a movimentação na tabela de Produção
        const producao = await prisma.producao.create({
            data: {
                usuarioId: Number(usuarioId),
                produtoId: Number(produtoId),
                tipo: String(tipo).toUpperCase(),
                qntd: Number(qntd),
                dados: dados ? new Date(dados) : new Date()
            }
        });

        const resposta = {
            mensagem: "Movimentação registrada com sucesso!",
            producao,
            estoqueAtual: resultado.novoEstoque
        };

        // Adiciona mensagem de alerta se o estoque estiver crítico
        if (resultado.alertaEstoqueBaixo) {
            resposta.alerta = `ATENÇÃO: O estoque do produto '${resultado.produtoNome}' (${resultado.novoEstoque}) está abaixo do mínimo permitido (${resultado.qntdMinimo})!`;
        }

        return res.status(201).json(resposta);
    } catch (erro) {
        return res.status(400).json({ erro: erro.message });
    }
};

const listar = async (req, res) => {
    try {
        const historico = await prisma.producao.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                produto: {
                    select: {
                        id: true,
                        nome: true,
                        estoque: true,
                        qntdMinimo: true
                    }
                }
            },
            orderBy: {
                dados: 'desc'
            }
        });

        return res.status(200).json(historico);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar histórico de produção." });
    }
};

const buscar = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    try {
        const producao = await prisma.producao.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                usuario: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    }
                },
                produto: true
            }
        });

        if (!producao) {
            return res.status(404).json({ erro: "Registro de movimentação não encontrado." });
        }

        return res.status(200).json(producao);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao buscar movimentação." });
    }
};

module.exports = {
    registrarMovimentacao,
    listar,
    buscar
};