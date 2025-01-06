import { getPokemons } from "../../service/pokedexService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Pokemon } from "../../types/pokemon.types";
import GridIcon from "./elements/GridIcon";
import NavBar from "./widgets/NavBar";
import { useHome } from "./hooks/useHome";
import ListIcon from "./elements/ListIcon";
import PokedexView from "./views/PokedexView";
import clsx from "clsx";
import PokeDetails from "./views/modals/PokeDetails";
import { LocalStorageContext } from "../../contexts/Contexts";
import { useSearch } from "./hooks/useSearch";
import RoundedButton from "../../common/elements/RoundedButton";


export default function Home() {
    
    const {data, isFetching, fetchNextPage} = useInfiniteQuery<Pokemon[]>({
        queryKey: ['pokemon'], 
        queryFn: ({pageParam}) => getPokemons(pageParam), 
        initialPageParam: 0,
        getNextPageParam: (_, allPages) => {
            return allPages.flat().length;
        },
    });

    const { 
        onToggleGridView, onToggleListView, 
        onCardClick, onCloseCard, onToggleMarkAsCaptured, onToggleCaptured,
        toggleCaptured, toggleGridView, selectedCard, capturedPokemons 
    } = useHome();

    const { onSearch, filteredPokemons } = useSearch(data, toggleCaptured, fetchNextPage);

    return (
        <div className={clsx("flex", "flex-col")}>
            <NavBar onSearch={onSearch}/>

            <div className={clsx("flex", "justify-center", "items-center")}>
                <RoundedButton 
                    width="w-16" 
                    height="h-8"
                    backgroundColor={clsx({
                        "bg-red-400":toggleCaptured,
                        "bg-gray-500":!toggleCaptured
                    })}
                    textColor="text-white"
                    className={clsx("text-xs", "ml-10")}
                    onClick={onToggleCaptured}
                >
                    Captured
                </RoundedButton>
                <ListIcon toggled={!toggleGridView} onClick={onToggleListView} />
                <GridIcon toggled={toggleGridView} onClick={onToggleGridView} />
            </div>

            <LocalStorageContext.Provider value={capturedPokemons??[]}>
                <PokedexView 
                    toggleGridview={toggleGridView} 
                    pokemons={filteredPokemons??[]} //{data?.pages.flat()??[]}
                    isFetching={isFetching}
                    onCardClick={onCardClick}
                    onLoadMore={fetchNextPage}
                />

                {selectedCard && (
                    <PokeDetails 
                        id={selectedCard} 
                        onClose={onCloseCard} 
                        onMarkCaptured={onToggleMarkAsCaptured}
                    />
                )}
            </LocalStorageContext.Provider>
        </div>
    )
}