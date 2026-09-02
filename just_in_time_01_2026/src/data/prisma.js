require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

if (!process.env.DATABASE_URL) {
  throw new Error("A variável DATABASE_URL não foi definida no arquivo .env");
}

const dbUrl = new URL(process.env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port, 10) || 3306,
  user: dbUrl.username,
  password: dbUrl.password || undefined,
  database: dbUrl.pathname.replace("/", ""),
});

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
