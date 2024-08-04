import Image from "next/image";

interface NothingProps{
    label: string;
    imageSrc: string;
}

export const Nothing = ({
    label, imageSrc
}:NothingProps) =>{
    return(
        <div className="h-full p-10 flex flex-col justify-center items-center">
            <div className="relative h-72 w-72">
                <Image alt="Nothing is here!" fill
                src={imageSrc}/>
            </div>
            <div className="text-muted-foreground text-base text-center">
                {label}
            </div>
        </div>
    )
}