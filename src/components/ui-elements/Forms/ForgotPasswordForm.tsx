import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import api from "../../../api/axios"
import { AxiosError, isAxiosError } from "axios"
import baseUrl from "../../../api/baseurl"
import { z } from "zod"
import { forgotPasswordSchema } from "../../../Schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"


const ForgotPasswordForm = () => {

  type FormFields = z.infer<typeof forgotPasswordSchema>

  const { setError, register, reset, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>({
    resolver: zodResolver(forgotPasswordSchema)
  })


  const forgotPassword = async (userData: FormFields) => {
    const request = await api.post(`${baseUrl}/api/forgot-password`, userData)

    return request.data
  }

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
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
      <input className="input small-text w-[80%]" {...register("email")} type="email" name="email" placeholder="Enter a valid email" />
      {errors.email && <span className="error">{errors.email.message}</span>}
      <br /> 
      <button disabled={isSubmitting} type="submit" className="button"> {isPending ? "processing..." : "Submit" } </button>
      <br />
      <br />
      {errors.root && <span className="error">{errors.root.message}</span>}
    </form>
  )
}

export default ForgotPasswordForm

