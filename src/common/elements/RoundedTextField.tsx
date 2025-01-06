import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface RoundedTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    fieldRef?: React.LegacyRef<HTMLInputElement>;
    text: string;
    borderColor?: string;
    width?: string;
    height?: string;
}

export default function RoundedTextField({fieldRef, text, borderColor, width, height, className, ...otherProps}: RoundedTextFieldProps) {

    return (
        <input
            ref={fieldRef}
            className={clsx("bg-white", "border", "rounded-full", "p-1","px-2", width, height, borderColor, className)} 
            value={text}
            {...otherProps}
        />  
    )
}