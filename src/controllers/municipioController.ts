import { Request, Response } from 'express';
import { getMunicipios } from '../services/municipioService.js';

export const listarMunicipios = async (req: Request, res: Response) => {
  try {
    const uf = req.query.uf as string;

    console.log('UF:', uf); 
    
    if (!uf) {
      return res.status(400).json({ error: 'Parâmetro "uf" é obrigatório.' });
    }

    const provider = process.env.API_PROVIDER;

    console.log('Provider:', provider); 

    if (!provider) {
      return res.status(500).json({ error: 'Provider não definido.' });
    }

    const municipios = await getMunicipios(uf, provider);
    res.json(municipios);
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ error: 'Erro ao buscar municípios.' });
  }
};
