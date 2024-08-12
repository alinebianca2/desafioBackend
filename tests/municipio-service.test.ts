import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getMunicipios } from '../src/services/municipioService';
import { Municipio } from '../src/interfaces/municipio.js';

const mock = new MockAdapter(axios);

describe('getMunicipios', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should get municipios from BrasilAPI', async () => {
    const uf = 'SP';
    const provider = 'brasilapi';
    const apiResponse = [
      { nome: 'São Paulo', codigo_ibge: '3550308' },
      { nome: 'Campinas', codigo_ibge: '3509502' },
    ];

    process.env.API_PROVIDER = provider;
    mock
      .onGet(`https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`)
      .reply(200, apiResponse);

    const municipios: Municipio[] = await getMunicipios(uf, provider);

    expect(municipios).toEqual([
      { name: 'São Paulo', ibge_code: '3550308' },
      { name: 'Campinas', ibge_code: '3509502' },
    ]);
  });

  it('should get municipios from IBGE', async () => {
    const uf = 'RJ';
    const provider = 'ibge';
    const apiResponse = [
      { nome: 'Rio de Janeiro', id: '3304557' },
      { nome: 'Niterói', id: '3303302' },
    ];

    process.env.API_PROVIDER = provider;
    mock
      .onGet(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      .reply(200, apiResponse);

    const municipios: Municipio[] = await getMunicipios(uf, provider);

    expect(municipios).toEqual([
      { name: 'Rio de Janeiro', ibge_code: '3304557' },
      { name: 'Niterói', ibge_code: '3303302' },
    ]);
  });

  it('should throw an error if the provider is invalid', async () => {
    await expect(getMunicipios('SP', 'invalid')).rejects.toThrow(
      'Provider não definido ou inválido.'
    );
  });
});
