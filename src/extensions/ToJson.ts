import BookingSource from "../models/enums/BookingSource";
import Guest from "../models/Guest";
import HousekeepingTask from "../models/HousekeepingTask";
import HousekeepingTaskType from "../models/enums/HousekeepingTaskType";
import PersonPrefix from "../models/enums/PersonPrefix";
import Reservation from "../models/Reservation";
import RoomType from "../models/enums/RoomType";
// Purpose
// ToJson: converts an object to a json string
// ToJsonReservation: converts a reservation object to a json string
// ToJsonRoomType: converts a room type to a json string
// ToJsonBookingSource: converts a booking source to a json string

// Cant figure out how to typeguard interfaces
/* export function ToJson(object: any): any{
    if(object as Reservation) return ToJsonReservation(object as Reservation);
    if(object as RoomType) return ToJsonRoomType(object);
    if(object as BookingSource) return ToJsonBookingSource(object);
    if(object as Guest[]) return object.map((guest: Guest) => ToJsonGuest(guest));
    if(object as Guest) return ToJsonGuest(object);
    throw new Error("Object is not implemented");
} */

export function ToJsonReservation(reservation: Reservation): any{
    return {
        ...reservation,
        roomType: ToJsonRoomType(reservation.roomType!), 
        bookingSource: ToJsonBookingSource(reservation.bookingSource!),
        checkIn: !reservation.checkIn ? undefined : ToJsonDateOnly(reservation.checkIn), 
        checkOut: !reservation.checkOut ? undefined : ToJsonDateOnly(reservation.checkOut),
        flightArrivalTime: !reservation.flightArrivalTime ? undefined : ToJsonTimeOnly(reservation.flightArrivalTime),
        flightDepartureTime: !reservation.flightDepartureTime ? undefined : ToJsonTimeOnly(reservation.flightDepartureTime),
        room: undefined,
        guests: undefined,
    };
}

export function ToJsonHousekeepingTask(task: HousekeepingTask): any {
    return {
        ...task,
        date: !task.date ? undefined : ToJsonDateOnly(task.date),
        type: !task.type ? undefined : ToJsonHousekeepingTaskType(task.type),
        room: undefined,
        schedule: undefined,
        housekeeper: undefined,
    };
}

export function ToJsonDateOnly(date: Date): string {
    if(date instanceof Date) return date.toISOString().split('T')[0];
    else return date;
}

export function ToJsonTimeOnly(date: Date): string {
    if (date instanceof Date) return date.toTimeString().split(' ')[0];
    else return date;
}

export function ToJsonRoomType(roomType: RoomType): number{
    switch(roomType){
        case RoomType.None:
            return 0;
        case RoomType.Apartment:
            return 1;
        case RoomType.Room:
            return 2;
        default:
            throw new Error("RoomType is not implemented");
    }
}

export function ToJsonBookingSource(bookingSource: BookingSource): number{
    switch(bookingSource){
        case BookingSource.None:
            return 0;
        case BookingSource.Tui:
            return 1;
        case BookingSource.BookingDotCom:
            return 2;
        case BookingSource.Expedia:
            return 3;
        case BookingSource.Airbnb:
            return 4;
        case BookingSource.Direct:
            return 5;
        case BookingSource.Despegar:
            return 6;
        default:
            throw new Error("BookingSource is not implemented");
    }
}

export function ToJsonHousekeepingTaskType(type: HousekeepingTaskType): number{
    switch(type){
        case HousekeepingTaskType.None:
            return 0;
        case HousekeepingTaskType.Towels:
            return 1;
        case HousekeepingTaskType.Bedsheets:
            return 2;
        case HousekeepingTaskType.All:
            return 3;
        default:
            throw new Error("HousekeepingTaskType is not implemented");
    }
}

export function ToJsonGuest(guest: Guest): any {
    return{
        ...guest,
        prefix: ToJsonPrefix(guest.prefix ?? PersonPrefix.Unknown),
        reservation: undefined,
    }
}

export function ToJsonPrefix(prefix: PersonPrefix): number{
    switch(prefix){
        case PersonPrefix.Unknown:
            return 0;
        case PersonPrefix.Mr:
            return 1;
        case PersonPrefix.Mrs:
            return 2;
        case PersonPrefix.Ms:
            return 3;
        case PersonPrefix.Other:
            return 4;
        default:
            throw new Error("Prefix is not implemented");
    }
}
