import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sistema de Oficinas Mecânicas API Online' });
});

// TODO: Rotas de Auth, Clientes, Veículos e OS

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
