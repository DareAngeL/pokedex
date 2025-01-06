import PokeCard from "../widgets/PokeCard";
import { Pokemon } from "../../../types/pokemon.types";
import clsx from "clsx";
import { usePokedexView } from "../hooks/usePokedexView";
import EmptyICSVG from "../../../assets/images/empty-ic.svg?react";

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

            {props.pokemons.length === 0 && (
                <div
                    className={clsx("flex", "flex-col", "absolute", "justify-center", "items-center", "top-[50%]", "translate-y-[-50%]", "left-[50%]", "translate-x-[-50%]")} 
                >
                    <EmptyICSVG
                        width={100}
                        height={100} 
                    />
                    <span className={clsx("text-gray-500")}>Oops! No pokemons here!</span>
                </div>
            )}
        </>
    )
}