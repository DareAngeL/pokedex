import clsx from "clsx";
import RoundedTextField from "../../../common/elements/RoundedTextField";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface NavBarProps {
    onSearch: (value: string) => void;
}

export default function NavBar(props: NavBarProps) {

    const [searchedValue, setSearchedValue] = useState("");

    return (
        <div className={clsx(
            "sticky",
            "flex",
            "justify-between",
            "items-center",
            "top-0",
            "w-full",
            "p-2",
            "shadow-sm",
            "mb-3",
            "px-10",
            "z-10",
            "bg-gradient-to-r",
            "from-blue-500",
            "via-purple-500",
            "to-red-500",
            "bg-[length:400%_400%]",
            "animate-gradient"
          )}>
            <h1 className="poppins-bold text-white">Pokedex</h1>
            <div className={clsx("flex", "gap-2")}>
                <RoundedTextField 
                    text={searchedValue} 
                    height="h-10"
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        if (value === "") {
                            props.onSearch("");
                        }

                        setSearchedValue(value);
                    }}
                    placeholder="Find a pokemon..."
                />
                <SearchOutlined className={clsx("text-2xl", "text-white")} onClick={() => props.onSearch(searchedValue)}/>
            </div>
        </div>
    )
}