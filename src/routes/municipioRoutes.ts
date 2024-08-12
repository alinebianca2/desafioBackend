import { Router } from 'express';
import { listarMunicipios } from '../controllers/municipioController.js';

const router = Router();

router.get('/municipios', listarMunicipios);

export default router;
