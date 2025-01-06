import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";
const localStorage = window.localStorage;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchData = async (url: string, config = {}) => {
    return await axiosInstance(url, config);
};

export const fetchLocalStorage = <T>(key: string, defaultValue: string) => {
    return JSON.parse(localStorage.getItem(key)??defaultValue) as T;
}

export const saveLocalStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
}