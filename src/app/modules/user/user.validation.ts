import z from "zod";


export const createUserZodSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 character!" })
        .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
        .string()
        .min(2, { message: "Email must be at least 2 character!" })
        .max(50, { message: "Email cannot exceed 50 characters" }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),
    phone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh"
        })
        .optional(),
    address: z
        .string()
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),
})