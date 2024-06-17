import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection=()=>{
    const {register,watch,formState:{errors}}=useFormContext<HotelFormData>()
    const typeWatch=watch("type")
    return(
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((hotelType)=>(
                    <label key={hotelType} className={
                        typeWatch === hotelType? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold" : 
                        "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold flex justify-center items-center"
                    }>
                        <input type="radio" className="hidden" value={hotelType} {...register("type",{
                            required:"This field is required"
                        })}/>
                        <span>{hotelType}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
            )}
        </div>
    )
}

export default TypeSection