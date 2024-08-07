import { HotelType } from "../types/types";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    isNumberOfNightsZero:boolean;
    hotel?: HotelType;
};


const BookingDetailSummary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotel,
    numberOfNights,
    isNumberOfNightsZero,
}: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2">
                Location:
                <div className="font-bold">
                {`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                Check In:
                <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                Check Out:
                <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                Total length of Stay:
                <div className="font-bold">{
                    isNumberOfNightsZero ? `0 Nights(Will be charged for 1 night according to Hotel policy)` 
                    : 
                    `${numberOfNights} Night(s)`    
                }</div>
            </div>
            <div className=" border-b py-2">
                Guests:
                <div className="font-bold">
                {adultCount} Adults & {childCount} Children
                </div>
            </div>
        </div>
    );
};
export default BookingDetailSummary