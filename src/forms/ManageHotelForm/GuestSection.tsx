import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestSection = () => {
    const{register,formState:{errors}}=useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="flex gap-4 bg-gray-300 px-3 py-4">
                <label className="text-gray-700 text-sm flex-1">
                    Adults
                    <input type="number" min={1}
                        className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                        {...register("adultCount", { required: "This field is required" })}
                    ></input>
                    {errors.adultCount && (
                        <span className="text-red-500 text-sm">{errors.adultCount.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm flex-1">
                    Children
                    <input type="number" min={1}
                        className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                        {...register("childCount", { required: "This field is required" })}
                    ></input>
                    {errors.childCount && (
                        <span className="text-red-500 text-sm">{errors.childCount.message}</span>
                    )}
                </label>
            </div>
            
        </div>
    )
}
export default GuestSection