import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface RoundedTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    text: string;
    borderColor?: string;
    width?: string;
    height?: string;
}

export default function RoundedTextField({text, borderColor, width, height, ...otherProps}: RoundedTextFieldProps) {

    return (
        <input
            className={clsx("bg-white", "border", "rounded-full", "p-1","px-2", width, height, borderColor)} 
            value={text}
            {...otherProps}
        />  
    )
}