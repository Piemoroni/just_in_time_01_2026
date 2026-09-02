const url = "http://localhost:3000";

const usuario = JSON.parse(localStorage.getItem("usuario"));

const formLogin = document.querySelector("#formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const emailInput = document.querySelector("#email").value;
        const senhaInput = document.querySelector("#senha").value;

        fetch(url + "/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailInput, senha: senhaInput })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status !== 200) {
                alert(res.body.erro || "Email ou senha inválidos");
                return;
            }

            localStorage.setItem("usuario", JSON.stringify(res.body.usuario));
            window.location.href = "index2.html";
        })
        .catch(() => {
            alert("Erro ao conectar com a API");
        });
    });
}

const listaProdutos = document.querySelector("#listaProdutos");

if (listaProdutos && usuario) {
    document.querySelector("#nomeUsuario").innerHTML = "Usuário: " + usuario.nome;
    carregarProdutos();
    carregarHistorico();
}

// Carrega os Produtos do Estoque
function carregarProdutos() {
    fetch(url + "/produtos/listar")
        .then(res => res.json())
        .then(produtos => {
            listaProdutos.innerHTML = "";
            const selectProduto = document.querySelector("#selectProduto");
            
            if (selectProduto) {
                selectProduto.innerHTML = '<option value="">Selecione o Produto</option>';
            }

            produtos.forEach(p => {
                listaProdutos.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.nome}</td>
                        <td><strong>${p.estoque}</strong></td>
                        <td>${p.qntdMinimo}</td>
                        <td>R$ ${Number(p.custo).toFixed(2)}</td>
                    </tr>
                `;

                if (selectProduto) {
                    selectProduto.innerHTML += `<option value="${p.id}">${p.nome} (Estoque: ${p.estoque})</option>`;
                }
            });
        })
        .catch(() => {
            alert("Erro ao carregar produtos");
        });
}

function carregarHistorico() {
    const listaHistorico = document.querySelector("#listaHistorico");
    if (!listaHistorico) return;

    fetch(url + "/producao/historico")
        .then(res => res.json())
        .then(data => {
            listaHistorico.innerHTML = "";
            data.forEach(item => {
                const dataFormatada = new Date(item.dados).toLocaleString("pt-BR");
                listaHistorico.innerHTML += `
                    <tr>
                        <td>${dataFormatada}</td>
                        <td>${item.produto ? item.produto.nome : '-'}</td>
                        <td><strong>${item.tipo}</strong></td>
                        <td>${item.qntd}</td>
                        <td>${item.usuario ? item.usuario.nome : '-'}</td>
                    </tr>
                `;
            });
        })
        .catch(() => {
            alert("Erro ao carregar histórico");
        });
}

function abrirModalProduto() {
    document.querySelector("#modalProduto").classList.remove("oculto");
}

function fecharModalProduto() {
    document.querySelector("#modalProduto").classList.add("oculto");
}

function abrirModalProducao() {
    document.querySelector("#modalProducao").classList.remove("oculto");
}

function fecharModalProducao() {
    document.querySelector("#modalProducao").classList.add("oculto");
}

const formProduto = document.querySelector("#formProduto");

if (formProduto && usuario) {
    formProduto.addEventListener("submit", function (e) {
        e.preventDefault();

        const produto = {
            nome: document.querySelector("#nomeProduto").value,
            descricao: document.querySelector("#descProduto").value,
            custo: parseFloat(document.querySelector("#custoProduto").value),
            estoque: parseInt(document.querySelector("#estoqueProduto").value),
            qntdMinimo: parseInt(document.querySelector("#minProduto").value)
        };

        fetch(url + "/produtos/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
        .then(res => res.json())
        .then(data => {
            if (data.erro) {
                alert(data.erro);
                return;
            }
            alert("Produto cadastrado com sucesso!");
            formProduto.reset();
            fecharModalProduto();
            carregarProdutos();
        })
        .catch(() => {
            alert("Erro ao cadastrar produto");
        });
    });
}

const formProducao = document.querySelector("#formProducao");

if (formProducao && usuario) {
    formProducao.addEventListener("submit", function (e) {
        e.preventDefault();

        const movimentacao = {
            usuarioId: usuario.id,
            produtoId: Number(document.querySelector("#selectProduto").value),
            tipo: document.querySelector("#tipoMovimentacao").value,
            qntd: Number(document.querySelector("#qntdMovimentacao").value)
        };

        fetch(url + "/producao/registrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movimentacao)
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(res => {
            if (res.status !== 201) {
                alert(res.body.erro || "Erro ao registrar movimentação");
                return;
            }

            alert(res.body.mensagem);
            if (res.body.alerta) {
                alert(res.body.alerta);
            }

            formProducao.reset();
            fecharModalProducao();
            carregarProdutos();
            carregarHistorico();
        })
        .catch(() => {
            alert("Erro ao registrar movimentação");
        });
    });
}

function sair() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}