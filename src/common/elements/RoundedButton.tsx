import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface CircleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    backgroundColor?: string;
    textColor?: string;
    width?: string;
    height?: string;
    children?: ReactNode;
}

export default function RoundedButton({backgroundColor, textColor, children, width, height, className, ...otherProps}: CircleButtonProps) {

    return (
        <button className={clsx("flex", "rounded-full", "justify-center", "border-none", backgroundColor, textColor, width, height, className)} {...otherProps}>
            {children}
        </button>
    )
}