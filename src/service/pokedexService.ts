import { fetchData } from "./api"

const LIMIT = 150;

export const getPokemons = async (offset: unknown) => {
    try {
        const response = await fetchData(`pokemon?offset=${offset}&limit=${LIMIT}`);
        return response.data.results;
    } catch (error) {
        console.error(error);   
        return Promise.reject(error);
    }
}

export const getPokemonDetails = async (id: string) => {
    try {
        const response = await fetchData(`pokemon/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);   
        return Promise.reject(error);
    }
}

export const getPokemonSpecies = async (id: string) => {
    try {
        const response = await fetchData(`pokemon-species/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);   
        return Promise.reject(error);
    }
}