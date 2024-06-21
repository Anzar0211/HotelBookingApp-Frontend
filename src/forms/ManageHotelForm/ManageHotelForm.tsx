import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";


export type HotelFormData={
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    pricePerNight:number;
    starRating:number;
    facilities:string[];
    imageFiles:FileList;
    imageUrls:string[];
    adultCount:number;
    childCount:number;
}

type Props={
    hotel?:HotelType,
    formType:string,
    onSave:(hotelFormData:FormData)=>void;
    isLoading:boolean
}

const ManageHotelForm=({onSave,isLoading,hotel,formType}:Props)=>{
    const formMethods=useForm<HotelFormData>();
    const {handleSubmit,reset}=formMethods
    useEffect(()=>{
        reset(hotel)
    },[hotel,reset])


    const onSubmit=handleSubmit((formDataJSON:HotelFormData)=>{
        const formData=new FormData()
        if(hotel){
            formData.append("hotelId",hotel._id)
        }
        formData.append("name",formDataJSON.name);
        formData.append("city",formDataJSON.city);
        formData.append("country",formDataJSON.country);
        formData.append("description",formDataJSON.description);
        formData.append("type",formDataJSON.type);
        formData.append("pricePerNight",formDataJSON.pricePerNight.toString());
        formData.append("starRating",formDataJSON.starRating.toString());
        formData.append("adultCount",formDataJSON.adultCount.toString());
        formData.append("childCount",formDataJSON.childCount.toString());
        formDataJSON.facilities.forEach((facility,index)=>{
            formData.append(`facilities[${index}]`,facility)
        })

        if(formDataJSON.imageUrls){
            formDataJSON.imageUrls.forEach((url,index)=>{
                formData.append(`imageUrls[${index}]`,url)
            })
        }

        Array.from(formDataJSON.imageFiles).forEach((file)=>{
            formData.append(`imageFiles`,file)
        })
        onSave(formData)

        console.log(formData)
    })
    return(
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection formType={formType}/>
                <TypeSection/>
                <FacilitiesSection/>
                <GuestSection/>
                <ImagesSection/>
                <span className="flex justify-end">
                    <button disabled={isLoading} type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-500">
                        {isLoading?"Saving...":"Save Hotel"}
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm