# Sistema de Gestão de Produção Just-in-Time 
Documentação técnica, requisitos, matriz de testes e mapa de evidências de desempenho para a aplicação de Gestão de Produção e Estoque baseada no conceito Just-in-Time.

---

## 1. Visão Geral do Sistema
O sistema foi desenvolvido utilizando a arquitetura **REST API** para gestão e controle de estoque de produção no modelo *Just-in-Time* (JIT). A solução permite a autenticação de usuários cadastrados, listagem dinâmica e busca de produtos em ordem alfabética, além da movimentação de entradas (`FABRICADO`) e saídas (`PEDIDO`) com verificação e disparo automático de alertas para níveis de estoque abaixo do mínimo configurado.

---

## 2. Tabela de Evidências de Avaliação

| Atividade / Evidência Observável | Capacidade | Peso | Sim | Não |
| :--- | :---: | :---: | :---: | :---: |
| **ATIVIDADE 6: REQUISITOS ADICIONAIS** | | | | |
| Permite ao usuário retornar à interface principal? | C7 | 1 | **[X]** | [ ] |
| Implementou campo de busca onde usuário insere o dado e a listagem de produtos é atualizada conforme termo inserido? | C7 | 3 | **[X]** | [ ] |
| **ATIVIDADE 7: INTERFACE GESTÃO DE PRODUÇÃO (JUST IN TIME)** | | | | |
| Desenvolveu a programação para o usuário selecionar o produto e selecionar se o produto foi pedido (entrar) ou produzido (sair) no estoque? (Atualizando a quantidade) | C7 | 2 | **[X]** | [ ] |
| Desenvolveu a programação que o usuário possa inserir data de movimentação de entrada ou saída? | C7 | 3 | **[X]** | [ ] |
| Desenvolveu a programação, para que a lista gerada seja em ordem alfabética? | C7 | 3 | **[X]** | [ ] |
| Implementou a verificação automática gerando o alerta de estoque abaixo do mínimo configurado? | C7 | 3 | **[X]** | [ ] |
| **ATIVIDADE 8: CASOS DE TESTES** | | | | |
| Descreveu ferramentas e ambiente de testes? | C8 | 2 | **[X]** | [ ] |
| Descreveu os casos de testes para cada requisito funcional? | C8 | 2 | **[X]** | [ ] |
| Executou testes em cada requisito funcional conforme casos de teste? | C8 | 2 | **[X]** | [ ] |
| **ATIVIDADE 9: DOCUMENTAÇÃO DE INFRAESTRUTURA** | | | | |
| Identificou a linguagem de programação e a versão no desenvolvimento do sistema? | C1 | 1 | **[X]** | [ ] |
| Identificou o SGBD utilizado e sua respectiva versão para a criação do banco de dados no servidor? | C1 | 1 | **[X]** | [ ] |
| Identificou Sistema operacional e sua versão para o desenvolvimento da aplicação? | C1 | 1 | **[X]** | [ ] |

---

## 3. Requisitos Funcionais

ENTREGA 01 – LISTA DE REQUISITOS FUNCIONAIS

[RF01] Interface de autenticação de usuários
	[RF01.1] Solicitar e-mail e senha do usuário.
	[RF01.2] Validar as credenciais do usuário com os dados cadastrados no banco de dados.
	[RF01.3] Informar ao usuário quando houver falha na autenticação.
	[RF01.4] Criar uma sessão para o usuário autenticado.
	[RF01.5] Redirecionar o usuário autenticado para a interface principal do sistema.

[RF02] Interface principal do sistema
	[RF02.1] Exibir o nome do usuário autenticado.
	[RF02.2] Disponibilizar menu ou opção de acesso ao cadastro de produtos.
	[RF02.3] Disponibilizar menu ou opção de acesso à gestão de produção (Just in Time).
	[RF02.4] Disponibilizar opção de logout.
	[RF02.5] Redirecionar o usuário para a tela de login após realizar o logout.

[RF03] Cadastro e gerenciamento de produtos
	[RF03.1] Listar os produtos cadastrados no banco de dados ao acessar a interface.
	[RF03.2] Exibir os produtos cadastrados em formato de tabela.
	[RF03.3] Disponibilizar campo de busca de produtos.
	[RF03.4] Atualizar a listagem conforme o termo informado na busca.
	[RF03.5] Permitir o cadastro de um novo produto.
	[RF03.6] Permitir a edição de um produto existente.
	[RF03.7] Permitir a exclusão de um produto existente.	
	[RF03.8] Armazenar o nome do produto.
	[RF03.9] Armazenar a descrição do produto.
	[RF03.10] Armazenar o custo do produto.
	[RF03.11] Armazenar a quantidade atual do produto em estoque.
	[RF03.12] Armazenar a quantidade mínima de estoque configurada para o produto.
	[RF03.13] Validar os dados informados no cadastro de produtos.
	[RF03.14] Validar os dados informados na alteração de produtos.
	[RF03.15] Exibir alertas quando os dados estiverem ausentes ou forem inválidos.
	[RF03.16] Disponibilizar opção para retornar à interface principal.

[RF04] Gestão de produção e movimentação de estoque
	[RF04.1] Listar os produtos cadastrados em ordem alfabética.
	[RF04.2] Permitir a seleção do produto que terá movimentação de estoque.
	[RF04.3] Permitir selecionar o tipo de movimentação: produto fabricado ou produto pedido.
	[RF04.4] Permitir informar a data da movimentação.
	[RF04.5] Registrar a quantidade de produtos fabricados.
	[RF04.6] Registrar a quantidade de produtos pedidos.
	[RF04.7] Aumentar a quantidade disponível em estoque quando um produto for fabricado.
	[RF04.8] Diminuir a quantidade disponível em estoque quando um produto for pedido.
	[RF04.9] Registrar a movimentação de produção no banco de dados.
	[RF04.10] Registrar o usuário responsável pela movimentação.
	[RF04.11] Registrar a data e a quantidade da movimentação.
	[RF04.12] Verificar automaticamente o estoque após uma saída de produtos.
	[RF04.13] Exibir um alerta quando o estoque ficar abaixo da quantidade mínima configurada.
	[RF04.14] Permitir acompanhar as movimentações de produção e pedidos.

[RF05] Controle de usuários e ações
	[RF05.1] Identificar o usuário responsável por cada ação realizada no sistema.
	[RF05.2] Registrar o usuário responsável pelas movimentações de estoque.
	[RF05.3] Manter o acesso às funcionalidades do sistema condicionado à autenticação do usuário.


---

## 4. Requisitos de Infraestrutura

* **Linguagem de Programação e Versão:** Node.js (v20.x ou superior / ES6+)
* **Framework Backend:** Express.js
* **ORM:** Prisma ORM
* **SGBD (Sistema Gerenciador de Banco de Dados) e Versão:** MySQL Server (v8.0)
* **Sistema Operacional do Ambiente de Desenvolvimento:** Windows 11 / Linux / macOS

Requisitos de Infraestrutura

Ambiente de Desenvolvimento
	Sistema Operacional: Microsoft Windows 11 Pro / 64-bits (ou Linux Ubuntu 22.04 LTS / macOS Sonoma)
	Ambiente de Execução (Runtime): Node.js `v20.x` LTS (gerenciador de pacotes `npm v10.x`)
	Editor de Código / IDE: Visual Studio Code (VS Code) com extensões *Prisma*, *ESLint* e *Thunder Client*

Banco de Dados (SGBD)
	Sistema Gerenciador de Banco de Dados: MySQL Server `v8.0` (ou MariaDB `v10.11`)
	Porta Padrão: `3306`
	Ferramenta de Modelagem / Gestão: MySQL Workbench `v8.0` / Prisma Studio

Tecnologias e Dependências da Aplicação
	Linguagem de Programação: JavaScript (ECMAScript 2023 / ES6+)
	Mapeamento Objeto-Relacional (ORM): Prisma ORM `v5.x`
	Framework Web Backend: Express.js `v4.x`
	Biblioteca de CORS: `cors` `v2.8.5` (para liberação de requisições Cross-Origin no frontend)

Especificações de Rede e Portas
	Servidor Backend (API REST): `http://localhost:3000`
	Servidor Frontend: Execução via protocolo HTTP local (`http://127.0.0.1:5500` via Live Server) ou protocolo de arquivo local (`file:///`)

---

## 5. Schema do Prisma (ORM)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
}

model Usuario {
  id    Int    @id @default(autoincrement())
  nome  String
  email String @unique
  senha String

  producoes Producao[]
}

model Produto {
  id         Int     @id @default(autoincrement())
  nome       String
  descricao  String?
  custo      Float
  estoque    Int
  qntdMinimo Int

  producoes Producao[]
}

model Producao {
  id    Int      @id @default(autoincrement())
  qntd  Int
  tipo  String
  dados DateTime @default(now())

  usuarioId Int
  produtoId Int

  usuario Usuario @relation(fields: [usuarioId], references: [id])
  produto Produto @relation(fields: [produtoId], references: [id])
}

```

---

## 6. Casos de Teste

### **Ferramentas e Ambiente de Testes**

* **Ferramentas:** Insomnia / Postman / Browser DevTools (Console e Network)
* **Ambiente de Testes:** Servidor Node.js local executando na porta `3000` integrado com banco de dados MySQL via Prisma.

### **Descrição e Execução dos Casos de Teste**

1. Ferramentas e Ambiente de Testes
	Ambiente de Desenvolvimento: Node.js (v18+), Express.js.
	Banco de Dados:MySQL (`preparacao_db`) gerenciado via Prisma ORM.
	Ferramenta de Execução de Testes de API:Insomnia / Postman / VS Code REST Client.
	Ferramenta de Validação BD: Prisma Studio (`npx prisma studio`) e MySQL Workbench.
	Servidor Local:Executado via `node server.js` em `http://localhost:3000`.

2. Casos de Testes por Requisito Funcional
	RF01 - Autenticação e Controle de Acesso
		CT01.1 - Login com Sucesso
			Entrada: `POST /usuarios/login` com JSON `{"email": "admin@teste.com", "senha": "123"}`.
			Resultado Esperado:** Status `200 OK`, mensagem de sucesso e dados do usuário retornados.

		CT01.2 - Login com Credenciais Inválidas
			Entrada: `POST /usuarios/login` com JSON `{"email": "admin@teste.com", "senha": "errada"}`.
			Resultado Esperado: Status `401 Unauthorized` e mensagem "Credenciais inválidas".

		CT01.3 - Cadastro de Usuário
			Entrada: `POST /usuarios/cadastrar` com JSON `{"nome": "Operador", "email": "op@teste.com", "senha": "123"}`.
			Resultado Esperado: Status `201 Created` e confirmação de cadastro.


	RF02 & RF03 - Gestão de Produtos (Cadastro, Edição e Listagem)**
		CT02.1 - Cadastrar Produto Válido
			Entrada: `POST /produtos/cadastrar` com JSON `{"nome": "Peça A", "custo": 15.50, "estoque": 50, "qntdMinimo": 10}`.
			Resultado Esperado: Status `201 Created` e retorno do objeto do produto.

		CT02.2 - Cadastrar Produto com Dados Inválidos**
			Entrada: `POST /produtos/cadastrar` enviando custo negativo `{"nome": "Peça B", "custo": -5, "estoque": 10, "qntdMinimo": 2}`.
			Resultado Esperado: Status `400 Bad Request` com mensagem de erro de validação.

		CT02.3 - Listar Produtos
			Entrada: `GET /produtos/listar`.
			Resultado Esperado: Status `200 OK` e lista em ordem alfabética.


	RF04 & RF05 - Movimentação de Estoque e Alertas de Produção
		CT04.1 - Entrada de Estoque (FABRICADO)
			Entrada: `POST /producao/registrar` com JSON `{"usuarioId": 1, "produtoId": 1, "tipo": "FABRICADO", "qntd": 20}`.
			Resultado Esperado: Status `201 Created`, aumento na quantidade em estoque do produto no banco de dados.

		CT04.2 - Saída de Estoque (PEDIDO) com Alerta de Estoque Baixo
			Entrada: `POST /producao/registrar` solicitando saída que deixe o estoque total menor que `qntdMinimo`.
			Resultado Esperado: Status `201 Created`, decremento no estoque e campo de `alerta` retornado na resposta da requisição.

		CT04.3 - Saída de Estoque sem Saldo Suficiente
		Entrada: `POST /producao/registrar` com `qntd` superior ao estoque atual.
		Resultado Esperado: Status `400 Bad Request` com mensagem "Estoque insuficiente".



---

## 7. Evidências Visuais (Prints do Frontend)

### **Tela de Login**

![Login ](prints/inicio.png)


### **Interface Principal / Listagem de Produtos**

![Produtos](prints/produtos.png)`


### **Cadastro de Produtos**

![Cadstrar Produto ](prints/cadastro.png)`


### **Movimentações**

![Movimentações ](prints/movimentacoes.png)`


### **Modal de Registro de Movimentação (Com alerta de Estoque Mínimo)**

![Movimentação](prints/movimentação.png)

---

## 8. Diagrama do Banco de Dados (DER)

![DER](DER-certo.png)

```
---

## Credenciais de Acesso para Testes

Para realizar os testes da aplicação e navegar pelas interfaces do sistema, utilize uma das contas pré-cadastradas no banco de dados abaixo:

| Usuário | E-mail de Acesso | Senha | Nível / Perfil |
| :--- | :--- | :--- | :--- |
| **Pietra** | `pietra@gmail.com` | `p123` | Administrador / Operador JIT |
| **Teste** | `teste@gmail.com` | `t123` | Operador de Estoque |
| **SAEP** | `saep@gmail.com` | `s123` | Avaliador / Leitor |

> **Instruções:** Acesse a tela inicial de login (`index.html`), insira o e-mail e a senha correspondentes e clique em **Entrar** para ser redirecionado ao painel principal (`index2.html`).


```

```