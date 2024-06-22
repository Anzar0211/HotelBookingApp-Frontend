import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelSearchResponse, HotelType} from '../../backend/src/shared/types'

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL


export const register=async(formData:RegisterFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    const responseBody= await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
}

export const signIn=async(formData:SignInFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:'POST',
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    const responseBody= await response.json()
    if(!response.ok){
        throw new Error(responseBody.message)
    }
    return responseBody;
}

export const signOut=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Logout Failed")
    }
}


export const validateToken=async()=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Token Invalid")
    }
    return response.json()
}

export const addHotel=async(hotelFormData:FormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body:hotelFormData
    })
    if(!response.ok){
        throw new Error("Error adding hotel")
    }
    return response.json()
}

export const getHotels=async():Promise<HotelType[]>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:'GET',
        credentials:"include"
        
    })
    const data=await response.json()
    
    if(!response.ok){
        throw new Error("Error getting hotels")
    }
    console.log(data.hotels);
    return data.hotels

}

export const getHotelById=async(hotelId:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        method:'GET',
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Error fetching hotel")
    }
    return response.json()
}

export const updateMyHotelById=async(hotelFormData:FormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
        method:"PUT",
        credentials:"include",
        body:hotelFormData
    })
    if(!response.ok){
        throw new Error("Error updating hotel")
    }
    return response.json()
}

export type SearchParms={
    destination?:string,
    checkIn?:string,
    checkOut?:string,
    adultCount?:string,
    childCount?:string,
    page?:string
}

export const searchHotels=async(searchParms:SearchParms):Promise<HotelSearchResponse>=>{
    const queryParams=new URLSearchParams()
    queryParams.append("destination",searchParms.destination || "")
    queryParams.append("checkIn",searchParms.checkIn || "")
    queryParams.append("checkOut",searchParms.checkOut || "")
    queryParams.append("adultCount",searchParms.adultCount || "")
    queryParams.append("childCount",searchParms.childCount || "")
    queryParams.append("page",searchParms.page || "")

    const response=await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`,{
        method:"GET"
    })
    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}