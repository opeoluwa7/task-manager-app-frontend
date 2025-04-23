import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export default loginSchema



export const registerSchema = z.object({
    name: z.string().trim(),
    email: z.string().toLowerCase().email({
                message: "Enter a valid email address"
        }).trim(),
    password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
                message: "Password must include at least one letter, one number, and one special character"
        }).trim()
})

export const updateUserSchema = z.object({
    name: z.string().trim().optional(),
    email: z.string().toLowerCase().email({
            message: "Enter a valid email address"
    }).trim().optional(),
    password: z.string().min(8, {
            message: "Password must be a minimum of 8 characters long"
    }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
            message: "Password must include at least one letter, one number, and one special character"
    }).trim().optional()
})

export const forgotPasswordSchema = z.object({
    email: z.string().toLowerCase().trim()
})



export const resetPasswordSchema = z.object({
    password: z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, { 
            message: "Password must include at least one letter, one number, and one special character"
    }).trim(),
    confirmPassword:  z.string().min(8, {
                message: "Password must be a minimum of 8 characters long"
        }).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/, { 
            message: "Password must include at least one letter, one number, and one special character"
    }).trim()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})


        


