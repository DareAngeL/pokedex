import { createContext } from "react";
import { PokemonLocalStorage } from "../types/pokemon.types";

export const LocalStorageContext = createContext<PokemonLocalStorage[]>([]);
export const ColorVariantsContext = createContext<{[color: string]: string[]}>({})