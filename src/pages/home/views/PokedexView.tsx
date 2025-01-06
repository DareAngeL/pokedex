import PokeCard from "../widgets/PokeCard";
import { Pokemon } from "../../../types/pokemon.types";
import clsx from "clsx";
import { usePokedexView } from "../hooks/usePokedexView";

interface PokedexGridViewProps {
    pokemons: Pokemon[]
    toggleGridview: boolean;
    isFetching: boolean;
    onCardClick: (id: string) => void;
    onLoadMore: () => void;
}

export default function PokedexView(props: PokedexGridViewProps) {

    const { getCapturedPokeID, getMatchedCapturedPokemon, getId, colorVariants, loaderRef } = usePokedexView(props.toggleGridview, props.onLoadMore);

    return (
        <>
            {props.toggleGridview ? (
                <div className={clsx("flex", "justify-center")}>
                    <div className={clsx("grid", "grid-cols-2", "md:grid-cols-3", "lg:grid-cols-5", "xl:grid-cols-6", "gap-4")}>
                        {props.pokemons.map((pokemon, index) => (
                            <PokeCard 
                                key={index} 
                                idx={getCapturedPokeID(pokemon.name)??"#"}
                                name={pokemon.name} 
                                color1={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[0]}
                                color2={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[3]}
                                color3={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[1]}
                                image={getMatchedCapturedPokemon(pokemon.name)?.image}
                                style="gridviewstyle"
                                onClick={() => props.onCardClick(getId(pokemon.url)??"")}
                            />
                        ))}

                        <div ref={loaderRef} style={{ height: '20px' }} />
                    </div>
                </div>
            ) : (
                <div className={clsx("flex", "flex-col", "justify-center", "items-center", "gap-4", "overflow-x-hidden")}>
                    {props.pokemons.map((pokemon, index) => (
                        <PokeCard
                            key={index} 
                            idx={getCapturedPokeID(pokemon.name)??"#"}
                            name={pokemon.name} 
                            color1={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[0]}
                            color2={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[3]}
                            color3={colorVariants[getMatchedCapturedPokemon(pokemon.name)?.color??""]?.[1]}
                            image={getMatchedCapturedPokemon(pokemon.name)?.image}
                            style="listviewstyle"
                            onClick={() => props.onCardClick(pokemon.name)}
                        />
                    ))}

                    <div ref={loaderRef} style={{ height: '20px' }} />
                </div>
            )}
        </>
    )
}