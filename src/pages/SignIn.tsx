import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"
import { Link, useLocation, useNavigate } from "react-router-dom"

export type SignInFormData={
    email:string,
    password:string
}
const SignIn=()=>{
    const queryClient=useQueryClient()
    const{showToast}=useAppContext()
    const navigate=useNavigate()
    const location=useLocation()
    const {register,formState:{errors},handleSubmit}=useForm<SignInFormData>()
    const mutation=useMutation(apiClient.signIn,{
        onSuccess:async()=>{
            showToast({message:"Login Successful",type:"SUCCESS"})
            await queryClient.invalidateQueries("validateToken")
            navigate(location.state?.from?.pathname || '/')
        },
        onError:(error:Error)=>{
            console.log(error);
            showToast({message:"Invalid Credentials",type:"ERROR"})
        }
    })
    const{isLoading}=mutation;
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data)
    })

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Sign In</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email Id
                    <input type='email' className='border rounded border-black hover:border-black w-full py-1 px-2 text font-normal' {...register("email",{required:"This field is required"})}></input>
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </label>
            </div>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input type='password' className='border rounded border-black hover:border-black w-full py-1 px-2 text font-normal' {...register("password",{required:"This field is required",minLength:{
                        value:6,
                        message:"Password must be atleast 6 characters long"
                    }
                    }
                    )
                    }></input>
                    {errors.password && (
                        <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                </label>
            </div>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Not Registered? <Link className="underline" to="/register">Create an account here</Link>
                </span>
                <span>
                    <button disabled={isLoading} type="submit" className='bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-gray-500'>
                        {isLoading?'Signing In...':'Sign In'}
                    </button>
                </span>
            </span>
        </form>
    )
}

export default SignIn