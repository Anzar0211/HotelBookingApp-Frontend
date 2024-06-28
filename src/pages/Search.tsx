import { useQuery } from "react-query"
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react"
import SearchResultsCard from "../components/SearchResultsCard"
import Pagination from "../components/Pagination"
import StarRatingFilter from "../components/StarRatingFilter"
import HotelTypesFilter from "../components/HotelTypesFilter"
import FacilitiesFilter from "../components/FacilitiesFilter"
import PriceFilter from "../components/PriceFilter"


const Search = () => {
    const search=useSearchContext()
    const[page,setPage]=useState<number>(1)
    const[selectedStars,setSelectedStars]=useState<string[]>([])
    const[selectedHotelTypes,setSelectedHotelTypes]=useState<string[]>([])
    const[selectedFacilities,setSelectedFacilities]=useState<string[]>([])
    const[selectedPrice,setSelectedPrice]=useState<number | undefined>()
    const[sortOption,setSortOption]=useState<string>("")

    const searchParams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        facilities:selectedFacilities,
        types:selectedHotelTypes,
        stars:selectedStars,
        maxPrice:selectedPrice?.toString(),
        sortOption
    }

    const{data:hotelData}=useQuery(["searchHotels",searchParams],()=>apiClient.searchHotels(searchParams))

    const handleStarsChanges=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating=event.target.value
        setSelectedStars((prevStars)=>(
            event.target.checked
            ?[...prevStars,starRating]
            :prevStars.filter((star)=>star!==starRating)
        ))
    }
    const handleHotelTypesChanges=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const hotelType=event.target.value
        setSelectedHotelTypes((prevTypes)=>(
            event.target.checked
            ?[...prevTypes,hotelType]
            :prevTypes.filter((type)=>type!==hotelType)
        ))
    }
    const handleFacilitiesChanges=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const facility=event.target.value
        setSelectedFacilities((prevFacilities)=>(
            event.target.checked
            ?[...prevFacilities,facility]
            :prevFacilities.filter((prevFacility)=>prevFacility!==facility)
        ))
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold  border-b border-slate-300 pb-5">
                        Filter By:
                    </h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChanges}/>
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypesChanges}/>
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChanges}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number)=>setSelectedPrice(value)}/>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination?` in ${search.destination}`:""}
                    </span>
                    <select value={sortOption} onChange={(event)=>setSortOption(event.target.value)} className="p-2 border rounded-md">
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night (Low to High)</option>
                        <option value="pricePerNightDesc">Price Per Night (High to Low)</option>
                    </select>
                </div>
                {
                    hotelData?.data.map((hotel,index)=>(
                        <SearchResultsCard hotel={hotel} key={index}/>
                    ))
                }
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page)=>setPage(page)} />

                </div>
            </div>
        </div>
    )
}
export default Search