import clsx from "clsx";
import RoundedTextField from "../../../common/elements/RoundedTextField";
import { SearchOutlined } from "@ant-design/icons";
import { useNavBar } from "../hooks/useNavBar";
import { Title } from "../elements/Title";

interface NavBarProps {
    onSearch: (value: string) => void;
}

export default function NavBar(props: NavBarProps) {

    const { onSearchClick, onSearchLostFocus, setSearchedValue, titleRef, searchRef, searchedValue } = useNavBar(props.onSearch);

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
            <Title titleRef={titleRef} />
            <div className={clsx("flex", "ml-5", "gap-2")}>
                <SearchOutlined 
                    className={clsx("text-2xl", "text-white")} 
                    onClick={onSearchClick}
                />
                <RoundedTextField 
                    fieldRef={searchRef}
                    text={searchedValue} 
                    height="h-10"
                    className={clsx(
                        "xs:w-0",
                        "xs:opacity-0",
                        "sm:w-full",
                        "sm:opacity-100",
                        "md:opacity-100",
                        "md:w-full",
                        "transition-all"
                    )}
                    onChange={(e) => {
                        const value = e.currentTarget.value;
                        if (value === "") {
                            props.onSearch("");
                        }

                        setSearchedValue(value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            props.onSearch(searchedValue);
                        }
                    }}
                    onBlur={onSearchLostFocus}
                    placeholder="Find a pokemon..."
                />
            </div>
        </div>
    )
}