import BookingSource from "./enums/BookingSource";
import Room from "./Room";
import RoomType from "./enums/RoomType";
import Guest from "./Guest";

export default interface Reservation{
    id?: number;
    checkIn?: Date;
    checkOut?: Date;
    flightArrivalNumber?: string;
    flightDepartureNumber?: string;
    flightArrivalTime?: Date;
    flightDepartureTime?: Date;
    bookingSource?: BookingSource;
    remarks?: string;

    scheduleId?: number;
    roomNumber?: number;
    roomType?: RoomType;
    roomScheduleId?: number;
    room?: Room;
    guests?: Guest[];
}