import { useContext, useEffect, useRef } from "react"
import { ColorVariantsContext, LocalStorageContext } from "../../../contexts/Contexts"

export function usePokedexView(toggleGridview: boolean, onLoadMore: () => void) {

    const capturedPokemons = useContext(LocalStorageContext);
    const colorVariants = useContext(ColorVariantsContext);

    const loaderRef = useRef(null);

    useEffect(() => {
        const loaderCurrent = loaderRef.current

        const observer = new IntersectionObserver(handleObserver, {
          rootMargin: '100px', // Trigger the observer when 100px from the bottom
          threshold: 1.0, // When 100% of the target is visible
        });

        if (loaderCurrent) {
          observer.observe(loaderCurrent);
        }
    
        // Clean up observer on unmount
        return () => {
          if (loaderCurrent) {
            observer.unobserve(loaderCurrent);
          }
        };
      }, [toggleGridview, loaderRef]);

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onLoadMore();
        }
      };

    const getCapturedPokeID = (name: string) => {
        const matchedCapturedPoke = capturedPokemons.find(a => a.name === name);
        if (!matchedCapturedPoke) return undefined;

        return matchedCapturedPoke.id+"";
    }

    const getMatchedCapturedPokemon = (name: string) => capturedPokemons.find(a => a.name === name);

    const getId = (url: string) => {
        const idSplit = url.split("/");
        idSplit.pop();
        return idSplit.pop()
    }

    return {
        loaderRef,
        colorVariants,
        capturedPokemons,
        getId,
        getCapturedPokeID,
        getMatchedCapturedPokemon
    }
}