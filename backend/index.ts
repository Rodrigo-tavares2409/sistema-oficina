import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import apiRoutes from './src/routes/api';

app.use('/api', apiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sistema de Oficinas Mecânicas API Online' });
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
