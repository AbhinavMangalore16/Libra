import { auth } from "@clerk/nextjs/server"
import prismadb from "./prismadb";
import { MAX_FREE_LIMIT } from "@/constants";

export const increaseAPILimit = async() =>{
    const { userId } = auth();
    if (!userId){
        return;
    }
    const userAPILimit = await prismadb.userAPILimit.findUnique({
        where: {
            userId
        }
    })
    if (userAPILimit){
        await prismadb.userAPILimit.update({
            where: {userId: userId},
            data: { counter: userAPILimit.counter+1},
        });
    } else{
        await prismadb.userAPILimit.create({
            data: { userId: userId, counter: 1}
        });
    }
};

export const checkFreeExhaust = async () => {
    const { userId } = auth();
    if (!userId){
        return false;
    }
    const userAPILimit = await prismadb.userAPILimit.findUnique({
        where: {
            userId: userId
        }
    });
    if (!userAPILimit){
        return true;
    }
    else if (userAPILimit.counter < MAX_FREE_LIMIT){
        return true;
    }
    else{
        return false;
    }
}

export const getAPILimit = async () =>{
    const { userId } = auth();
    if (!userId){
        return 0;
    }
    const userAPILimit = await prismadb.userAPILimit.findUnique({
        where: { userId: userId }
    });
    if (!userAPILimit){
        return 0;
    }
    return userAPILimit.counter;
}