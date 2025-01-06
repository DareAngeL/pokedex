import clsx from "clsx";
import RoundedTextField from "../../../common/elements/RoundedTextField";

interface CaptureStatProps {
    text: string;
    value: string;
    onChangeValue: (e: React.FormEvent<HTMLInputElement>) => void;
    type: "date" | "text";
    disabled: boolean;
}

export default function CaptureStat(props: CaptureStatProps) {

    return (
        <div className={clsx("flex", "items-center", "gap-2", "text-sm")}>
            <span className={clsx("w-28")}>{props.text}</span>
            <RoundedTextField 
                width="w-full"
                type={props.type} 
                text={props.value} 
                onChange={props.onChangeValue}
                disabled={props.disabled}
            />
        </div>
    )
}