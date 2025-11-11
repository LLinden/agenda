// backend/index.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Cria/abre o banco de dados
const caminhoBanco = path.join(__dirname, 'agenda.banco');
const banco = new sqlite3.Database(caminhoBanco);

// Cria tabela se não existir
banco.serialize(() => {
  banco.run(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT,
      cidade TEXT,
      estado TEXT
    )
  `);
});

// Listar contatos
app.get('/contatos', (req, res) => {
  banco.all('SELECT * FROM contatos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cadastrar contato
app.post('/contatos', (req, res) => {
  const { nome, telefone, email, cidade, estado } = req.body;
  if (!nome || !telefone)
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios.' });

  const sql = `INSERT INTO contatos (nome, telefone, email, cidade, estado)
               VALUES (?, ?, ?, ?, ?)`;
  banco.run(sql, [nome, telefone, email, cidade, estado], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, nome, telefone, email, cidade, estado });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ API rodando em http://localhost:${PORT}`));
