import request from 'supertest';
import express from 'express';
import { listarMunicipios } from '../src/controllers/municipioController';
import * as municipioService from '../src/services/municipioService';

const app = express();
app.get('/municipios', listarMunicipios);

describe('listarMunicipios Controller', () => {
  it('should return 400 if "uf" is not provided', async () => {
    const response = await request(app).get('/municipios');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Parâmetro "uf" é obrigatório.' });
  });

  it('should return 500', async () => {
    process.env.API_PROVIDER = '';

    const response = await request(app).get('/municipios').query({ uf: 'SP' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Provider não definido.' });
  });

  it('should return municipios', async () => {
    const mockMunicipios = [{ name: 'São Paulo', ibge_code: '3550308' }];

    jest
      .spyOn(municipioService, 'getMunicipios')
      .mockResolvedValue(mockMunicipios);

    process.env.API_PROVIDER = 'ibge';

    const response = await request(app).get('/municipios').query({ uf: 'SP' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMunicipios);
  });

  it('should handle errors', async () => {
    jest
      .spyOn(municipioService, 'getMunicipios')
      .mockRejectedValue(new Error('Erro ao buscar municípios'));

    process.env.API_PROVIDER = 'ibge';

    const response = await request(app).get('/municipios').query({ uf: 'SP' });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao buscar municípios.' });
  });
});
