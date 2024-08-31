import * as zod from "zod";

export const formSchema = zod.object({
    prompt: zod.string().min(1, {
        message: "Image prompt is necessary",
    }),
    amount: zod.enum(["1", "2", "3", "4", "5"], {
        errorMap: () => ({ message: "Please select a valid amount" }),
    }),
    resolution: zod.enum(["LOW", "MID", "HIGH"], {
        errorMap: () => ({ message: "Please select a valid resolution" }),
    }),
});

export const amtOptions = [
    {
        value: "1",
        label: "1 photo"
    },
    {
        value: "2",
        label: "2 photos"
    },
    {
        value: "3",
        label: "3 photos"
    },
    {
        value: "4",
        label: "4 photos"
    },
];

export const resOptions = [
    {
        res: "LOW",
        label: "LOW",
    },
    {
        res: "MID",
        label: "MID",
    },
    {
        res: "HIGH",
        label: "HIGH",
    }
];
