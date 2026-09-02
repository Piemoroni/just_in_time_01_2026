const express = require("express");
const cors = require("cors"); 
const app = express();

// 2. Configure o CORS antes das suas rotas
app.use(cors({
  origin: "http://127.0.0.1:5500" 
}));

app.use(express.json());

const usuarioRoutes = require("./src/routes/usuarios.routes");
const produtoRoutes = require("./src/routes/produto.routes");
const producaoRoutes = require("./src/routes/producao.routes");

app.use("/usuarios", usuarioRoutes);
app.use("/produtos", produtoRoutes);
app.use("/producao", producaoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
