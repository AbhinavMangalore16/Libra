import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = () =>{
    const { user } = useUser();
    return(
        <Avatar className="h-4 w-4">
            <AvatarImage src = {user?.imageUrl}/>
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )
}