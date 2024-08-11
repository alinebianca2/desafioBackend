import { Router } from 'express';
import { listarMunicipios } from '../controllers/municipioController';

const router = Router();

router.get('/municipios', listarMunicipios);

export default router;
