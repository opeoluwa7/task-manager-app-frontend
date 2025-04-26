import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import api from "../../../api/axios"
import { AxiosError, isAxiosError } from "axios"
import baseUrl from "../../../api/baseurl"
import { z } from "zod"
import { resetPasswordSchema } from "../../../Schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const ResetForm = () => {

    type FormFields = z.infer<typeof resetPasswordSchema>

    const { setError, register, reset, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>({
        resolver: zodResolver(resetPasswordSchema)
    })


    const resetPassword = async (userData: FormFields) => {
        const request = await api.post(`${baseUrl}/api/reset-password`, userData)

        return request.data
    }

    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            alert(data.message)
            reset()
        },
        onError: (error: Error | AxiosError) => {
            if (isAxiosError(error)) {
                const err = error.response?.data.error;
                    setError("root", {
                        type: 'server',
                        message: err
                    })
            } else {
                setError("root", {
                    type: 'server',
                    message: `${error}`
                })
            }
        }
    })

    const onSubmit: SubmitHandler<FormFields> = (data, e) => {
        e?.preventDefault();

        mutate(data)
    }


    return (
        <form className="flex flex-col w-full  items-center" onSubmit={handleSubmit(onSubmit)}>
            <input className="input small-text w-[80%]" {...register("password")} type="password" name="password" placeholder="Enter your new password" />
            {errors.password && <span className="error">{errors.password.message}</span>}
            <br /> 
            <button disabled={isSubmitting} type="submit" className="button"> {isPending ? "processing..." : "Submit" } </button>
            <br />
            <br />
            {errors.root && <span className="error">{errors.root.message}</span>}
        </form>
    )
}

export default ResetForm
