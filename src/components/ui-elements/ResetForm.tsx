import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import api from "../../api/axios"
import { AxiosError, isAxiosError } from "axios"
import baseUrl from "../../api/baseurl"
import { z } from "zod"
import { resetPasswordSchema } from "../../Schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"

const ResetForm = () => {

    type FormFields = z.infer<typeof resetPasswordSchema>

    const { setError, register, reset, handleSubmit, formState: {errors} } = useForm<FormFields>({
        resolver: zodResolver(resetPasswordSchema)
    })


    const resetPassword = async (userData: FormFields) => {
        const request = await api.post(`${baseUrl}/api/reset-password`, userData).then((res) => console.log(res.data))

        return request
    }

    const { mutate } = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            alert("Password Reset Successful!")
            reset()
        },
        onError: (error: Error | AxiosError) => {
            if (isAxiosError(error)) {
                const err = error.response?.data.error;

                if (err) {

                    setError("root", {
                        type: 'server',
                        message: err
                    })
                }
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("password")} type="password" name="password" placeholder="Enter your new password" />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            <br /> 
            <input type="submit" />
            <br />
            {errors.root && <span className="text-red-500">{errors.root.message}</span>}
        </form>
    )
}

export default ResetForm
