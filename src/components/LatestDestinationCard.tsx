import { Link } from "react-router-dom"
import { HotelType } from "../types/types"

type Props={
    hotel:HotelType
}

const LatestDestinationCard = ({hotel}:Props) => {
    return (
        <Link to={`detail/${hotel._id}`} className="relative cursor-pointer overflow-hidden rounded-md">
            <div className="group">
                <div className="h-[300px] transition-transform duration-300 ease-in-out transform group-hover:scale-105">
                    <img src={hotel.imageUrls[0]} alt="" className="w-full h-full object-cover object-center"/>
                </div>
                <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
                    <span className="text-white font-bold tracking-tight text-3xl">
                        {hotel.name}
                    </span>
                </div>
            </div>
        </Link>
    )
}
export default LatestDestinationCard