import { SVGAttributes } from "react";
import GridIC from "../../../assets/images/grid-ic.svg?react";
import clsx from "clsx";

interface GridIconProps extends SVGAttributes<SVGSVGElement> {
    toggled: boolean;
}

export default function GridIcon({ toggled, ...otherProps }: GridIconProps) {

    return (
        <GridIC 
            width={25} 
            height={24} 
            className={clsx(
                "ms-2", "me-10", "fill-current",
                {"text-red-400":toggled}, {"text-gray-700":!toggled}
            )}
            {...otherProps}
        />
    )
}