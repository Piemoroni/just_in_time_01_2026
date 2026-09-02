const prisma = require("../data/prisma");

const processarMovimentacao = async (produtoId, tipo, qntd) => {
    // 1. Busca o produto
    const produto = await prisma.produto.findUnique({
        where: { id: Number(produtoId) }
    });

    if (!produto) {
        throw new Error("Produto não encontrado.");
    }

    // Conversão GARANTIDA para número puro (evita concatenação de texto)
    const estoqueAtualNum = Number(produto.estoque);
    const quantidadeNum = Number(qntd);
    const tipoFormatado = String(tipo).trim().toUpperCase();

    let novoEstoque = 0;

    // 2. Aplica a matemática correta
    if (tipoFormatado === "FABRICADO") {
        // ENTRADA -> Aumenta estoque
        novoEstoque = estoqueAtualNum + quantidadeNum;
    } else if (tipoFormatado === "PEDIDO") {
        // SAÍDA -> Diminui estoque
        if (estoqueAtualNum < quantidadeNum) {
            throw new Error(`Estoque insuficiente. Atual: ${estoqueAtualNum}, Solicitado: ${quantidadeNum}`);
        }
        novoEstoque = estoqueAtualNum - quantidadeNum;
    } else {
        throw new Error("Tipo de movimentação inválido. Use 'FABRICADO' ou 'PEDIDO'.");
    }

    // 3. Atualiza o banco garantindo que o valor enviado é Number
    const produtoAtualizado = await prisma.produto.update({
        where: { id: Number(produtoId) },
        data: { estoque: Number(novoEstoque) }
    });

    return {
        novoEstoque: Number(produtoAtualizado.estoque),
        alertaEstoqueBaixo: Number(produtoAtualizado.estoque) < Number(produtoAtualizado.qntdMinimo),
        produtoNome: produtoAtualizado.nome,
        qntdMinimo: Number(produtoAtualizado.qntdMinimo)
    };
};

module.exports = {
    processarMovimentacao
};