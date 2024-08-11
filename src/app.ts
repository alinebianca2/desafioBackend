import express from 'express';
import municipioRoutes from './routes/municipioRoutes';

const app = express();

app.use(express.json());

app.use('/api', municipioRoutes);

export default app;

