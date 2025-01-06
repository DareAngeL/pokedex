import clsx from "clsx";
import PokeBall from "../../../assets/images/PokeBall.png";

interface TitleProps {
    titleRef: React.RefObject<HTMLDivElement>
}

export function Title(props: TitleProps) {

    return (
        <div className={clsx("flex", "items-center")}>
            <h1 ref={props.titleRef} className={clsx("poppins-bold", "text-white", "overflow-clip", "transition-all")}>P</h1>
            <img src={PokeBall} className={clsx("w-[32px]", "h-[32px]", "mt-2")}/>
            <h1 ref={props.titleRef} className={clsx("poppins-bold", "text-white", "overflow-clip", "transition-all")}>kedex</h1>
        </div>
    )
}