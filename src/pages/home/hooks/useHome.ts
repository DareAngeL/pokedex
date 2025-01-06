import { useEffect, useState } from "react"
import { PokemonLocalStorage } from "../../../types/pokemon.types";
import { fetchLocalStorage } from "../../../service/api";
import { useQueryClient } from "@tanstack/react-query";

export function useHome() {
    
    const queryClient = useQueryClient();

    const [capturedPokemons, setCapturedPokemons] = useState<PokemonLocalStorage[]>();
    const [toggleGridView, setToggleGridview] = useState(true);
    const [toggleListView, setToggleListview] = useState(false);
    const [selectedCard, setSelectedCard] = useState<string|undefined>(undefined);
    const [toggleCaptured, setToggleCaptured] = useState(false);

    useEffect(() => {
        const init = () => {
            setCapturedPokemons(fetchLocalStorage("captured", "[]"));
        }

        init();
    }, [])

    const onToggleGridView = () => {
        queryClient.resetQueries({queryKey: ["pokemon"], exact: true});
        setToggleGridview(true);
        setToggleListview(false);
    }

    const onToggleListView = () => {
        queryClient.resetQueries({queryKey: ["pokemon"], exact: true});
        setToggleListview(true);
        setToggleGridview(false);
    }

    const onToggleMarkAsCaptured = () => {
        const newCapturedData = fetchLocalStorage<PokemonLocalStorage[]>("captured", "[]");
        setCapturedPokemons(newCapturedData);
    }

    const onToggleCaptured = () => {
        queryClient.resetQueries({queryKey: ["pokemon"], exact: true});
        setToggleCaptured(!toggleCaptured)
    }

    const onCardClick = (id: string) => {
        setSelectedCard(id);
    }

    const onCloseCard = () => {
        setSelectedCard(undefined);
    }

    return {
        capturedPokemons,
        toggleListView,
        toggleGridView,
        selectedCard,
        toggleCaptured,
        onToggleCaptured,
        onToggleMarkAsCaptured,
        onToggleGridView,
        onToggleListView,
        onCardClick,
        onCloseCard,
    }
}