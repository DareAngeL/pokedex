import { SVGAttributes } from "react";
import ListIC from '../../../assets/images/list-ic.svg?react'
import clsx from "clsx";

export interface ListIconProps extends SVGAttributes<SVGSVGElement> {
    toggled: boolean;
}

export default function ListIcon({toggled, ...otherProps}: ListIconProps) {

    return (
        <ListIC 
            width={30} 
            height={30} 
            className={clsx(
                "ms-auto", {"text-red-400":toggled},  {"text-gray-600":!toggled}, "fill-current"
            )} 
            {...otherProps}
        />
    )
}