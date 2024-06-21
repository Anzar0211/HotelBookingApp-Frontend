import { useMutation, useQuery } from "react-query"
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useAppContext } from "../contexts/AppContext"





const EditHotel = () => {
  const{hotelId}=useParams()
  const{data:hotel}=useQuery("getHotelById",()=>apiClient.getHotelById(hotelId || ''),
    {
      enabled:!!hotelId
    }
  )
  const{showToast}=useAppContext()
  const{mutate,isLoading}=useMutation(apiClient.updateMyHotelById,{
    onSuccess:()=>{
      showToast({message:"Hotel Updated successfully",type:"SUCCESS"})

    },
    onError:(error:Error)=>{
      showToast({message:error.message,type:"ERROR"})
    }
  })
  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }
  return <ManageHotelForm formType="Edit Hotel" hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
}
export default EditHotel