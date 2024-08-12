import express from 'express';
import municipioRoutes from './routes/municipioRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', municipioRoutes);

export default app;

