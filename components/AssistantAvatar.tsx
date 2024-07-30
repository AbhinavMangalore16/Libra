import { Avatar, AvatarImage } from "./ui/avatar"

export const AssistantAvatar = () =>{
    return(
        <Avatar className="h-8 w-8">
            <AvatarImage className="p-1" src="/libra_logo.png"/>
        </Avatar>
    );
};