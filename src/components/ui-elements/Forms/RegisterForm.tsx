import { SubmitHandler ,useForm } from "react-hook-form";

import { registerSchema }  from "../../../Schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {AxiosError, isAxiosError} from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {

    

      type FormFields = z.infer<typeof registerSchema>;

      const {register, setError, handleSubmit, formState: {isSubmitting, errors}, reset} = useForm<FormFields>({
        resolver: zodResolver(registerSchema) 
      });
      

      const registerUser = async(userData: FormFields) => {
          const response = await api.post('https://task-manager-api-2025.up.railway.app/api/register', userData) ;

          return response.data
      } 
   

      const { mutate, isPending } = useMutation({
          mutationFn:  registerUser,
          onSuccess: (data) => {
            const navigate = useNavigate()
            const response = data
            alert(response.message)
            reset()
            navigate("/")
          },
          onError: (error: Error | AxiosError ) => {
            if (isAxiosError(error)) {
                const err = error.response?.data.error;  
                
                if (err.email) {
                    const emailErr = err.email._errors[0]
                    console.log(emailErr)
                    setError("email", {
                        type: 'server',
                        message: emailErr
                      })
                  }
                if (err.password){
                    const pErr = err.password._errors[0] 
                    console.log(pErr)
                  
                    setError("password", {
                        type: 'server',
                        message: pErr
                      })
                  } 

                setError("root", {
                    type: 'server',
                    message: err
                  })
                
                const serverError = []; 
                serverError.push(err)
                
                const value: any = Object.values(serverError[0])

                const rootError = value[1]._errors[0];

               

                setError("root", {
                    type: 'server',
                    message: rootError          
                  })
                  
                } else {
                  setError("root", error)
                }
            }
        })

      const onSubmit: SubmitHandler<FormFields> = (data: FormFields, e) => {
          e?.preventDefault()
          mutate(data)
         

      }

    return(
        <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
            <input className="input" {...register("name")} name="name" type="text" placeholder="Enter your name" />

            {errors.name && <span className="error">{errors.name.message}</span>}
            <br />

            <input className="input" {...register("email")} name="email" type="text" placeholder="Enter your email" />

            {errors.email && <span className="error">{errors.email?.message}</span>}
            <br />

            <input className="input" {...register("password")} name="password" type="password" placeholder="Enter your password" />

            {errors.password && <span className="error">{errors.password?.message}</span>}
            <br />

            <button disabled={isSubmitting} type="submit" className="button" > {isPending ? "processing" : "Submit"} </button>
            <br />
            <br  />

            {errors.root && <span className="error">{errors.root.message}</span>}
        </form>
    ) 
}

export default RegisterForm

