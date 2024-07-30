import { Avatar, AvatarImage } from "./ui/avatar"

export const AssistantAvatar = () =>{
    return(
        <Avatar className="h-4 w-4">
            <AvatarImage className="p-1" src="/libra_logo.png"/>
        </Avatar>
    );
};