import { SubmitHandler ,useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import  { loginSchema }  from "../../../Schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {AxiosError, isAxiosError} from "axios";
import { useMutation } from "@tanstack/react-query";
import api from "../../../api/axios";


const LoginForm = () => {

  

    type FormFields = z.infer<typeof loginSchema>;

    const {register, setError, handleSubmit, formState: {isSubmitting, errors}, reset} = useForm<FormFields>({
    resolver: zodResolver(loginSchema)
    });

    const loginUser = async(userData: FormFields) => {
      const response = await api.post('https://task-manager-api-2025.up.railway.app/api/login', userData);

      return response.data
    } 
 
    const navigate = useNavigate();
  
    const { mutate, isPending } = useMutation({
      mutationFn:  loginUser,
      onSuccess: (data) => {
        alert(data.message)
        reset()
        navigate("/homepage")
      },
      onError: (error: Error | AxiosError ) => {
        if (isAxiosError(error)) {
          const err = error.response?.data.error; 
          console.error(err)
          
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

    const onSubmit: SubmitHandler<FormFields> = (data: FormFields) => {
      mutate(data) 

    }

    return(
      <form className="flex flex-col items-center w-full" onSubmit={handleSubmit(onSubmit)}>
      <input className="input" {...register("email")} name="email" type="text" placeholder="Enter your email" />

      <br />

      {errors.email && <span className="text-red-500">{errors.email?.message}</span>}

      <br />

      <input className="input" {...register("password")} name="password" type="password" placeholder="Enter your password" />
      <Link className="text-end text-yellow-400 w-full text-sm relative top-2" to="/forgot-password">Forgot Password?</Link> 

      <br />

      {errors.password && <span className="error">{errors.password?.message}</span>}

      <button disabled={isSubmitting} type="submit" className="button" > {isPending ? "processing..." : "Submit"} </button>
      <br />
      <br />

       <p className="text-center text-sm"> Never been here before? <Link className="text-yellow-400 text-base relative left-2" to="/register">sign up</Link> </p>


      <br />
      {errors.root && <span className="error">{errors.root.message}</span>}
      </form>
    ) 
  }

export default LoginForm
