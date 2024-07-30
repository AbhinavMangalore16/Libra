import Image from "next/image";

interface NothingProps{
    label: string;
}

export const Nothing = ({
    label
}:NothingProps) =>{
    return(
        <div className="h-full p-10 flex flex-col justify-center items-center">
            <div className="relative h-72 w-72">
                <Image alt="Nothing is here!" fill
                src="/nothing-here.png"/>
            </div>
            <p className="text-muted-foreground text-base text-center">
                {label}
            </p>
        </div>
    )
}