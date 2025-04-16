import { SubmitHandler ,useForm } from "react-hook-form";
import Button from "./ButtonComponent";
import  loginSchema  from "../../Schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {AxiosError, isAxiosError} from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";


const LoginForm = () => {

  

    type FormFields = z.infer<typeof loginSchema>;

    const {register, setError, handleSubmit, formState: {isSubmitting, errors}, reset} = useForm<FormFields>({
    resolver: zodResolver(loginSchema), 
    mode: 'all',
    defaultValues: {
      email: '',
      password: ''
    }
    });
    
    type ServerResponse = {
      success: boolean,
      message: string,
      user: {
        user_id: number,
        name: string,
        email: string
      }
    }

    const loginUser = async(userData: FormFields) => {
      const response = await api.post<ServerResponse>('https://task-manager-api-2025.up.railway.app/api/login', userData) 
      .then((res) => console.log(res.data));

      return response
    } 
 

    const { mutate } = useMutation({
      mutationFn:  loginUser,
      onSuccess: () => {
        alert("Successful!!")
        reset()
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


          if (error.response?.data.error) {
            const err = error.response?.data.error
            setError("root", {
              type: 'server',
              message: err
            })
          };

          
          const serverError = []; 
          serverError.push(error.response?.data.error)
          
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
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input className="input" {...register("email")} name="email" type="text" placeholder="Enter your email" />
      {errors.email && <span className="text-red-500">{errors.email?.message}</span>}
      <br />
      <input className="input" {...register("password")} name="password" type="password" placeholder="Enter your password" />
      {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
      <br />
      <Button isDisabled={isSubmitting} buttonType="submit" text={isSubmitting ? "Loading" : "Submit"} />
      {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>
    ) 
  }

export default LoginForm
