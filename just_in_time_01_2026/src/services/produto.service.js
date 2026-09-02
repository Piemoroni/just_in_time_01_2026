const validarDadosProduto = (dados) => {
    const { nome, custo, estoque, qntdMinimo } = dados;

    if (!nome || custo === undefined || estoque === undefined || qntdMinimo === undefined) {
        return "Todos os campos obrigatórios (nome, custo, estoque, qntdMinimo) devem ser preenchidos.";
    }

    if (custo < 0 || estoque < 0 || qntdMinimo < 0) {
        return "Valores numéricos de custo e estoque não podem ser negativos.";
    }

    return null;
};

module.exports = {
    validarDadosProduto
};