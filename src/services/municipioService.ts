import axios from 'axios';
import { Municipio } from '../interfaces/municipio';

const API_PROVIDER = process.env.API_PROVIDER || 'brasilapi'; 

export const getMunicipios = async (uf: string, provider: string) => {
  let url = '';

  if (API_PROVIDER  === 'brasilapi') {
    url = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`;
  } else if (API_PROVIDER  === 'ibge') {
    url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;
  } else {
    throw new Error('Provider não definido ou inválido.');
  }

  const response = await axios.get(url);

  const municipios: Municipio[] = (response.data as any[]).map((municipio: any) => {

    if (API_PROVIDER === 'brasilapi') {
      return {
        name: municipio.nome,
        ibge_code: municipio.codigo_ibge,
      };
    } else if (API_PROVIDER === 'ibge') {
      return {
        name: municipio.nome,
        ibge_code: municipio.id,
      };
    }
    throw new Error('Provider não definido ou inválido.');
  });

  return municipios;
};
