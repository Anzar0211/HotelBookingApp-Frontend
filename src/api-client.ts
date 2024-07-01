import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {HotelSearchResponse, HotelType, PaymentIntentResponse, UserType} from '../../backend/src/shared/types'
import { BookingFormData } from "./forms/BookingForm/BookingForm";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL


export const fetchCurrentUser=async():Promise<UserType>=>{
    const response=await fetch(`${API_BASE_URL}/api/users/me`,{
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("User not found")
    }
    return response.json()
}


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

export type SearchParams={
    destination?:string,
    checkIn?:string,
    checkOut?:string,
    adultCount?:string,
    childCount?:string,
    page?:string,
    facilities?:string[],
    types?:string[],
    stars?:string[],
    maxPrice?:string,
    sortOption?:string
}

export const searchHotels=async(SearchParams:SearchParams):Promise<HotelSearchResponse>=>{
    const queryParams=new URLSearchParams()
    queryParams.append("destination",SearchParams.destination || "");
    queryParams.append("checkIn",SearchParams.checkIn || "");
    queryParams.append("checkOut",SearchParams.checkOut || "");
    queryParams.append("adultCount",SearchParams.adultCount || "");
    queryParams.append("childCount",SearchParams.childCount || "");
    queryParams.append("page",SearchParams.page || "");
    queryParams.append("maxPrice",SearchParams.maxPrice || "");
    queryParams.append("sortOption",SearchParams.sortOption || "")
    SearchParams.facilities?.forEach((facility)=>
        queryParams.append("facilities",facility)
    )

    SearchParams.types?.forEach((type)=>
        queryParams.append("types",type)
    )

    SearchParams.stars?.forEach((star)=>
        queryParams.append("stars",star)
    )



    const response=await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`,{
        method:"GET"
    })
    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    return response.json()
}


export const fetchHotelById=async(hotelId:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`,{
        method:"GET"
    })
    console.log(response);
    if(!response.ok){
        throw new Error("Error fetching hotel")
    }
    return response.json()
}


export const createPaymentIntent=async(hotelId:string,numberOfNights:string):Promise<PaymentIntentResponse>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            numberOfNights
        })
    })
    if(!response.ok){
        throw new Error("Error creating payment intent")
    }
    return response.json()
}

export const createRoomBooking=async(formData:BookingFormData)=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    if(!response.ok){
        throw new Error("Error booking room")
    }

}


export const fetchMyBookings=async():Promise<HotelType[]>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-bookings`,{
        credentials:"include"

    })
    if(!response.ok){
        throw new Error("Error fetching bookings")
    }
    return response.json()
}