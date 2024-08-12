import request from 'supertest';
import express from 'express';
import axios from 'axios';
import router from '../src/routes/municipioRoutes';
import { getMunicipios } from '../src/services/municipioService';
import MockAdapter from 'axios-mock-adapter';

const app = express();
app.use(express.json());
app.use('/', router);
const mock = new MockAdapter(axios);


describe('GET /municipios', () => {
  it('should get municipios from IBGE', async () => {


    const mockMunicipios = [
      { name: 'São Paulo', ibge_code: '3550308' },
      { name: 'Campinas', ibge_code: '3509502' }
    ];

    mock.onGet('/municipios', {
      params: { uf: 'SP' }
    }).reply(200, mockMunicipios);

    const municipios = await getMunicipios('SP', 'ibge');
    expect(municipios).toEqual(mockMunicipios);
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
