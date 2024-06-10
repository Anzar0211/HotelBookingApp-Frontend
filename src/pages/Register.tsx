import {useForm} from 'react-hook-form'
import { useMutation } from 'react-query'
import * as apiClient from '../api-client'

export type RegisterFormData={
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}


const Register=()=>{
    const{register,watch,handleSubmit,formState:{errors}}=useForm<RegisterFormData>()
    
    const mutation=useMutation(apiClient.register,{
        onSuccess:()=>{
            console.log("Registration Successful");
        },
        onError:(error:Error)=>{
            console.log(error);
        }
    })

    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data)
    })

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className='border rounded border-black hover:border-black w-full py-1 px-2 text font-normal' {...register("firstName",{required:"This field is required"})}></input>
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className='border rounded border-black hover:border-black w-full py-1 px-2 text font-normal' {...register("lastName",{required:"This field is required"})}></input>
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <div className='flex flex-col md:flex-row gap-5'>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input type='password' className='border rounded border-black hover:border-black w-full py-1 px-2 text font-normal' {...register("confirmPassword",{
                        validate:(val)=>{
                            if(!val){
                                return "This field is required"
                            }
                            if(val!==watch("password")){
                                return "Passwords do not match"
                            }
                        }
                    })
                    }></input>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                    )}
                </label>
            </div>
            <span>
                <button type="submit" className='bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700'>Register</button>
            </span>
        </form>
    )
}

export default Register;