import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

type Props={
    formType:string
}

const DetailsSection = ({formType}:Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
    <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">{formType}</h1>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Name
            <input type="text"
            className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
            {...register("name", { required: "This field is required" })}
            ></input>
            {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
        </label>

        <div>
            <label className="text-gray-700 text-sm font-bold flex-1">
            Address
                <textarea rows={2}
                    className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                    {...register("address", { required: "This field is required" })}
                ></textarea>
                {errors.address && (
                    <span className="text-red-500 text-sm">{errors.address.message}</span>
                )}
            </label>
        </div>

        <div className="flex gap-4">
            
            <label className="text-gray-700 text-sm font-bold flex-1">
                City
                <input type="text"
                    className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                    {...register("city", { required: "This field is required" })}
                ></input>
                {errors.city && (
                    <span className="text-red-500 text-sm">{errors.city.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Country
                <input type="text"
                    className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                    {...register("country", { required: "This field is required" })}
                ></input>
                {errors.country && (
                    <span className="text-red-500 text-sm">{errors.country.message}</span>
                )}
            </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Description
            <textarea rows={10}
                className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                {...register("description", { required: "This field is required" })}
            ></textarea>
            {errors.description && (
                <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Price Per Night
            <input type="number"
                className="border rounded border-black hover:border-black w-full py-1 px-2 text font-normal"
                {...register("pricePerNight", { required: "This field is required" })}
            ></input>
            {errors.pricePerNight && (
                <span className="text-red-500 text-sm">{errors.pricePerNight.message}</span>
            )}
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Star Rating
            <select {...register("starRating",{
                required:"This field is required"
            
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            >
                <option value="" className="text-sm font-bold">
                    Select a Rating
                </option>
                {[1,2,3,4,5].map((num)=>{
                    return <option value={num} key={num}>{num}</option>
                })}
            </select>
            {errors.starRating && (
                <span className="text-red-500 text-sm">{errors.starRating.message}</span>
            )}
        </label>
    </div>
    );
};

export default DetailsSection;
