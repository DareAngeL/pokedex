import { useContext, useEffect, useState } from "react";
import { PokemonDetails, PokemonLocalStorage, PokemonSpecies } from "../../../types/pokemon.types"
import { saveLocalStorage } from "../../../service/api";
import { ColorVariantsContext, LocalStorageContext } from "../../../contexts/Contexts";
import { useToastify } from "../../../common/hooks/useToastify";

export function usePokeDetail(id: number) {
    const capturedPokemonsLocal = useContext(LocalStorageContext);
    const colorVariants = useContext(ColorVariantsContext);

    const [nickname, setNickname] = useState<string|undefined>();
    const [date, setDate] = useState<string|undefined>();

    const { error } = useToastify();

    useEffect(() => {
        const init = () => {
            const matchedPoke = capturedPokemonsLocal.find(a => a.id === id);
            setNickname(matchedPoke?.nickname);
            setDate(matchedPoke?.date);
        }
        
        init();
    }, [id]);
    
    const onMarkAsCapturedClick = (pokemon: PokemonDetails|undefined, pokeSpecies: PokemonSpecies|undefined) => {
        if (!pokemon || !pokeSpecies) {
            return error("Something went wrong!");
        }

        const newPokeLocal: PokemonLocalStorage = {
            id: pokemon.id,
            name: pokemon.name,
            color: pokeSpecies.color.name,
            image: pokemon.sprites.other["official-artwork"].front_default,
            nickname: nickname??"",
            date: date??"",
        }

        capturedPokemonsLocal.push(newPokeLocal);
        saveLocalStorage<PokemonLocalStorage[]>("captured", capturedPokemonsLocal);
    }

    const isCaptured = () => capturedPokemonsLocal.some(a => a.id === id) ;

    return {
        nickname,
        date,
        colorVariants,
        isCaptured,
        onMarkAsCapturedClick,
        setNickname,
        setDate
    }
}