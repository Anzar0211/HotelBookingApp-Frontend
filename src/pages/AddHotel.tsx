import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";


const AddHotel=()=>{
    const navigate=useNavigate()
    const{showToast}=useAppContext()
    const{mutate,isLoading}=useMutation(apiClient.addHotel,{
        onSuccess:()=>{
            showToast({message:"Hotel added successfully",type:"SUCCESS"})
            navigate("/my-hotels")
        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"})
        }
    
    })
    const handleSave=(hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }
    return(
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    )
}

export default AddHotel;


