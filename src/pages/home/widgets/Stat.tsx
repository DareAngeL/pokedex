import clsx from "clsx";

interface StatProps {
    name: string;
    value: number;
}

export default function Stat(props: StatProps) {    

    return (
        <div className={clsx('flex', 'items-center', 'gap-2')}>
            <span className={clsx('w-52', 'text-sm')}>{props.name}</span>
            <div className={clsx('relative', 'rounded-full', 'w-full', 'h-[.5rem]', 'overflow-clip')}>
                <div className={clsx('absolute', 'w-full', 'h-full', 'bg-gray-300')}></div>
                <div 
                    className={clsx(
                        'absolute', 
                        'h-full', 
                        {
                            'bg-green-500':props.value>=60,
                            'bg-yellow-500':props.value>=40&&props.value<60,
                            'bg-red-500':props.value>=0&&props.value<40
                        },
                    )} 
                    style={{width: `${props.value}%`}}
                ></div>
            </div>
        </div>
    )
}