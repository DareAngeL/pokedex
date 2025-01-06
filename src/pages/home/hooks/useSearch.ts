import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react";
import { Pokemon, PokemonLocalStorage } from "../../../types/pokemon.types";
import { fetchLocalStorage } from "../../../service/api";

export function useSearch(data: InfiniteData<Pokemon[], unknown> | undefined, toggleCaptured: boolean, fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<InfiniteData<Pokemon[], unknown>, Error>>) {

    const [searchText, setSearchText] = useState<string>("");
    const queryClient = useQueryClient();
    
    const filteredPokemons = useMemo(() => {
        // captured filter
        if (toggleCaptured) {
            const pokeLocal = fetchLocalStorage<PokemonLocalStorage[]>("captured", "[]");
            const captured = data?.pages.flat().filter(pokemon => {
                const isCaptured = pokeLocal.some(localPokemon => localPokemon.name === pokemon.name);
                return isCaptured;
            });

            if (data?.pages[data.pages.length-1].length??0 !== 0) 
                fetchNextPage();

            return captured;
        }

        if (!searchText) return data?.pages.flat() ?? [];
        // search filter
        const newFiltered = data?.pages.flat().filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchText.toLowerCase()) 
        ) ?? [];
    
        if (data?.pages[data.pages.length-1].length??0 !== 0) 
            fetchNextPage();
    
        return newFiltered;
    }, [data, searchText, toggleCaptured]);

    const onSearch = async (value: string) => {
        queryClient.resetQueries({queryKey: ["pokemon"], exact: true});
        setSearchText(value);
    }

    return {
        filteredPokemons,
        onSearch
    }
}