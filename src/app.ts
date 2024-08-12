import express from 'express';
import municipioRoutes from './routes/municipioRoutes';

const app = express();

app.use(express.json());

// ROTA_MUNICIPIO

app.use('/api', municipioRoutes);


export default app;
