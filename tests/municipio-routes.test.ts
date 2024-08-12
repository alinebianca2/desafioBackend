import request from 'supertest';
import express from 'express';
import router from '../src/routes/municipioRoutes';
import * as municipioService from '../src/services/municipioService';

const app = express();
app.use(express.json());
app.use('/', router);

describe('GET /municipios', () => {
  it('should return municipios', async () => {
    const mockMunicipios = [
      { name: 'São Paulo', ibge_code: '3550308' },
      { name: 'Campinas', ibge_code: '3509502' },
    ];

    jest
      .spyOn(municipioService, 'getMunicipios')
      .mockResolvedValue(mockMunicipios);

    const response = await request(app).get('/municipios').query({ uf: 'SP' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockMunicipios);
  });

  it('should return a 400 error if uf is not provided', async () => {
    const response = await request(app).get('/municipios');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Parâmetro "uf" é obrigatório.' });
  });

  it('should return a 500 error if provider is not defined', async () => {
    process.env.API_PROVIDER = '';

    const response = await request(app).get('/municipios').query({ uf: 'SP' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Provider não definido.' });
  });
});
