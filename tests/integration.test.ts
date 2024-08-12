import request from 'supertest';
import app from '../src/app';

describe('GET /municipios', () => {
  it('should return a list of municipios with status 200', async () => {
    const response = await request(app).get('/municipios').query({ uf: 'SP' });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((municipio: any) => {
      expect(municipio).toHaveProperty('name');
      expect(municipio).toHaveProperty('ibge_code');
    });
  });

  it('should return 400 if uf query parameter is missing', async () => {
    const response = await request(app).get('/municipios');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      'error',
      'Parâmetro "uf" é obrigatório.'
    );
  });

  it('should return 500 ', async () => {
    jest
      .spyOn(require('../services/municipioService'), 'getMunicipios')
      .mockImplementation(() => {
        throw new Error('Simulated error');
      });

    const response = await request(app).get('/municipios').query({ uf: 'SP' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Erro ao buscar municípios.');
  });
});
