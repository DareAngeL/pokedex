import clsx from "clsx";
import Stat from "../../widgets/Stat";
import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails, getPokemonSpecies } from "../../../../service/pokedexService";
import { PokemonDetails, PokemonSpecies } from "../../../../types/pokemon.types";
import { LeftOutlined } from "@ant-design/icons";
import PokeBall from "../../../../assets/images/PokeBall.png";
import PokeballSVG from "../../../../assets/images/pokeball-modern.svg?react"
import RoundedButton from "../../../../common/elements/RoundedButton";
import CaptureStat from "../../widgets/CaptureStat";
import { usePokeDetail } from "../../hooks/usePokeDetail";

interface PokeDetailsProps {
    id: string;
    onClose: () => void;
    onMarkCaptured: () => void;
}

export default function PokeDetails(props: PokeDetailsProps) {

    const { data: pokeDetails, isFetching: isPokeDetailsFetching } = useQuery<PokemonDetails>({queryKey: ["pokedetails"], queryFn: () => getPokemonDetails(props.id)})
    const { data: pokeSpecies, isFetching: isPokeSpeciesFetching } = useQuery<PokemonSpecies>({queryKey: ["pokespecies"], queryFn: () => getPokemonSpecies(props.id)});
    
    const { onMarkAsCapturedClick, setDate, setNickname, isCaptured, date, nickname, colorVariants } = usePokeDetail(pokeDetails?.id??0);

    return (
        <div 
            className={clsx(
                "fixed", 
                "flex", 
                "top-0", 
                "w-full", 
                "h-full", 
                "justify-center",
                "items-center", 
                "z-10",
            )}
        >
            <div 
                className={clsx(
                    "absolute",
                    "flex",
                    "justify-center",
                    "items-center",
                    "backdrop-blur-sm", 
                    "w-full", 
                    "h-full", 
                    {
                        "z-30":isPokeDetailsFetching&&isPokeSpeciesFetching, 
                        "backdrop-blur-lg":isPokeDetailsFetching&&isPokeSpeciesFetching
                    })
                }
                onClick={props.onClose}
            >
                {(isPokeDetailsFetching&&isPokeSpeciesFetching) && (
                    <img 
                        src={PokeBall} 
                        width={200} 
                        height={200} 
                    />
                )}
            </div>
            
            <div className={clsx(
                "flex", 
                "flex-col", 
                "rounded-3xl", 
                "lg:w-[30%]",
                "md:w-[50%]", 
                "sm:w-[95%]", 
                "h-[90%]", 
                "shadow-md", 
                "bg-white", 
                "overflow-clip", 
                "z-20", 
                "animate-fadeIn"
            )}>
                <div className={clsx("flex", "justify-between", "p-2", "px-5")}>
                    <RoundedButton 
                        width="w-8"
                        height="w-8"
                        backgroundColor={colorVariants[pokeSpecies?.color.name||""]?.[0]}
                        textColor={colorVariants[pokeSpecies?.color.name||""]?.[2]}
                        className={clsx("transition-all")}
                        onClick={props.onClose}
                    >
                        <LeftOutlined />
                    </RoundedButton>

                    <RoundedButton
                        backgroundColor={colorVariants[pokeSpecies?.color.name||""]?.[0]}
                        textColor={colorVariants[pokeSpecies?.color.name||""]?.[2]}
                        className={clsx(
                            "p-1", "gap-1", "items-center",
                            "shadow-sm", 
                            {
                                "hover:shadow-md":!isCaptured(),
                                "hover:scale-105":!isCaptured(),
                            }, 
                            "select-none",
                            "transition-all"
                        )}
                        onClick={() => {
                            onMarkAsCapturedClick(pokeDetails, pokeSpecies);
                            props.onMarkCaptured();
                        }}
                        {...isCaptured() && {disabled:true}}
                    >
                        <img src={PokeBall} width={25} height={25} />
                        <p>{isCaptured() ? "Captured" : "Mark As Captured"}</p>
                    </RoundedButton>
                </div>
                
                <div className={clsx("flex", "justify-between", "items-center")}>
                    <p className={clsx("text-4xl", "ml-4", "poppins-bold")}>{pokeDetails?.name.toLocaleUpperCase()}</p>
                    <p className={clsx("text-gray-700", "mr-5")}>#{pokeDetails?.id}</p>
                </div>

                <div className={clsx("flex-1", "px-4", "py-2", "max-h-[50%]", "overflow-y-auto")}>
                    
                    <div className={clsx("flex", "text-sm")}>
                        <span className={clsx("w-3/12", "pr-5", "pl-1")}>Height</span>
                        <span>{pokeDetails?.height}cm</span>
                    </div>
                    <div className={clsx("flex", "text-sm")}>
                        <span className={clsx("w-3/12", "pr-5", "pl-1")}>Weight</span>
                        <span>{pokeDetails?.weight}kg</span>
                    </div>
                    <div className={clsx("flex", "items-center", "text-sm")}>
                        <span className={clsx("w-3/12", "pr-5", "pl-1")}>Abilities</span>
                        <div className={clsx("flex", "flex-wrap", "gap-1")}>
                            {pokeDetails?.abilities.map((ab, idx) => (
                                <span key={idx} className={clsx("rounded-full", "p-1", "px-2", "shadow-sm", "shadow-gray-300")}>{ab.ability.name}</span>
                            ))}
                        </div>
                    </div>

                    <p className={clsx("text-xl", "mt-4")}>Base Stats</p>

                    <div className={clsx("flex", "flex-col", "gap-1")}>
                        {pokeDetails?.stats.map((st, index) => (
                            <Stat key={index} name={st.stat.name} value={st.base_stat} />
                        ))}
                    </div>

                    <p className={clsx("text-xl", "mt-4")}>Captured Stats</p>

                    <div className={clsx("flex", "flex-col", "gap-1")}>
                        <CaptureStat 
                            text="Nickname" 
                            type="text"
                            value={nickname??""}
                            onChangeValue={(e) => setNickname(e.currentTarget.value)}
                            disabled={isCaptured()}
                        />
                        <CaptureStat 
                            text="Date" 
                            type="date"
                            value={date??""}
                            onChangeValue={(e) => setDate(e.currentTarget.value)}
                            disabled={isCaptured()}
                        />
                    </div>
                </div>

                <div className={clsx("relative", "flex-1", "rounded-3xl", "p-5", "max-h-[50%]", "transition-all", colorVariants[pokeSpecies?.color.name||""]?.[0])}>
                    <div className={clsx("flex", "gap-1")}>
                        {pokeDetails?.types.map((dtl, idx) => (
                            <span key={idx} className={clsx(
                                "rounded-full", 
                                "p-1", "px-2", 
                                "text-[.7rem]", 
                                "shadow-sm", 
                                colorVariants[pokeSpecies?.color.name||""]?.[1],
                                colorVariants[pokeSpecies?.color.name||""]?.[2] // text color
                            )}>
                                {dtl.type.name}
                            </span>
                        ))}
                    </div>

                    <PokeballSVG 
                        width={'90%'} 
                        height={'90%'} 
                        className={clsx(
                            "absolute",
                            "right-[-30%]",
                            colorVariants[pokeSpecies?.color.name||""]?.[3]
                        )}
                    />

                    <PokeballSVG 
                        width={'40%'} 
                        height={'40%'} 
                        className={clsx(
                            "absolute",
                            "left-[-10%]",
                            "bottom-[-10%]",
                            "rotate-45",
                            colorVariants[pokeSpecies?.color.name||""]?.[3]
                        )}
                    />

                    <img 
                        className={clsx("absolute", "left-[50%]", "translate-x-[-50%]", "transition-all")} 
                        src={pokeDetails?.sprites.other["official-artwork"].front_default}
                        width={"50%"}
                        height={"50%"}
                    />
                </div>
            </div>
        </div>
    )
}