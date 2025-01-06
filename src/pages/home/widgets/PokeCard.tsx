import PokeBallSVG from "../../../assets/images/pokeball-modern.svg?react";
import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";

interface PokeCardProps {
    idx: string;
    name: string;
    style: 'gridviewstyle' | 'listviewstyle';
    color1?: string;
    color2?: string;
    color3?: string;
    image?: string;
    onClick: () => void;
}

function PokeCard(props: PokeCardProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const containerRef = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef) {
            observer.observe(containerRef);
        }

        return () => {
            if (containerRef) {
                observer.unobserve(containerRef);
            }
        };
    }, []);
  
  return (
    <>
        <div 
            ref={ref} 
            className={clsx(
                "relative",
                {"w-[13rem]":props.style==="gridviewstyle"},
                {"w-[80%]":props.style==="listviewstyle"},
                {"h-[10rem]":props.style==="gridviewstyle"},
                {"h-[7rem]":props.style==="listviewstyle"},
                "rounded-2xl",
                "shadow-sm",
                "hover:shadow-md",
                "hover:scale-105",
                props.color1??"bg-white",
                "shadow-slate-300",
                "transition-all",
                "duration-500",
                {"animate-pokecard":isVisible},
                "overflow-clip",
                "select-none"
            )}
            onClick={props.onClick}
        >
            <PokeBallSVG 
                width={props.style==="gridviewstyle"?120:200} 
                height={props.style==="gridviewstyle"?120:200} 
                className={clsx(
                    {
                        "absolute":props.style==="listviewstyle", 
                        "top-[-2rem]":props.style==="listviewstyle", 
                    },
                    props.color2??"text-gray-100"
                )}
            />
            <span className={clsx("absolute", "top-2", "right-3", "text-slate-500")}>#{props.idx}</span>

            <img 
                className={clsx(
                    "absolute", 
                    {
                        "bottom-[25%]":props.style==="gridviewstyle",
                        "right-[15%]":props.style==="gridviewstyle",
                        "md:left-[20%]":props.style==="listviewstyle",
                        "sm:left-[5%]":props.style==="listviewstyle"
                    },
                )}
                src={props.image} 
                width={props.style==="gridviewstyle"?"50%":"150px"} 
                height={props.style==="gridviewstyle"?"50%":""} 
            />

            <p className={clsx(
                "absolute",
                "rounded-full",
                {
                    "bottom-5":props.style==="gridviewstyle",
                    "bottom-10":props.style==="listviewstyle"
                },
                "right-[50%]",
                "translate-x-[50%]",
                "p-1",
                "px-5",
                "text-center",
                "shadow-sm",
                {
                    "bg-gradient-to-r":props.color1,
                    "from-purple-400":props.color1,
                    "to-red-400":props.color1,
                    "bg-white":!props.color1
                },
                "text-slate-700",
                "poppins-bold"
            )}>
                {props.name.toLocaleUpperCase()}
            </p>

            {props.color2 && (
                <span className={clsx("absolute", "bottom-0", "left-[50%]", "translate-x-[-50%]", "rounded-full", "p-1", "text-xs", props.color2)}>Captured</span>
            )}
        </div>
    </>
  )
}

export default memo(PokeCard)