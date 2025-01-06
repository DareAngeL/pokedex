import { useState, useRef } from "react";
import { xs } from "../../../common/util/util";

export function useNavBar(onSearch: (value: string) => void) {

    const [searchedValue, setSearchedValue] = useState("");
    const titleRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const isSearchFieldOpen = useRef(false);

    const toggleSearchfield = () => {
        const classList = searchRef.current?.classList;
        const searchRefCurrent = searchRef.current;
        const titleRefCurrent = titleRef.current;
        
        if (classList && classList.contains("xs:w-0")) {
            searchRefCurrent?.classList.add("w-full");
            titleRefCurrent?.classList.add("w-0");
            searchRefCurrent?.classList.remove("xs:w-0", "xs:opacity-0");
            searchRefCurrent?.focus();
            isSearchFieldOpen.current = true;
        }
        else if (classList && classList.contains("w-full")) {
            searchRefCurrent?.classList.add("xs:w-0", "xs:opacity-0");
            titleRefCurrent?.classList.remove("w-0");
            searchRefCurrent?.classList.remove("w-full");
            isSearchFieldOpen.current = false;
        }
    }

    const onSearchClick = () => {
        if (xs.matches) {
            if (isSearchFieldOpen.current) {
                onSearch(searchedValue);
            } else {
                toggleSearchfield();
            }

            return;
        }

        onSearch(searchedValue);
    }

    const onSearchLostFocus = () => {
        if (xs.matches) {
            toggleSearchfield();
        }
    }

    return {
        titleRef,
        searchedValue,
        searchRef,
        onSearchLostFocus,
        setSearchedValue,
        onSearchClick
    }
}