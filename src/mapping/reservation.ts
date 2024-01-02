import { DateOnlyToDateTime, HourMinuteToDateTime, TimeOnlyToDateTime } from "../extensions/Date";
import Reservation from "../models/Reservation";

export default function Map(reservation: Reservation): Reservation{
    const arrivalTime = reservation.flightArrivalTime ? TimeOnlyToDateTime(reservation.flightArrivalTime) : undefined;
    const departureTime = reservation.flightDepartureTime ? TimeOnlyToDateTime(reservation.flightDepartureTime) : undefined;
    return {
        ...reservation,
        checkIn: new Date(DateOnlyToDateTime(reservation.checkIn!)),
        checkOut: new Date(DateOnlyToDateTime(reservation.checkOut!)),
        flightArrivalTime: !arrivalTime 
            ? undefined 
            : HourMinuteToDateTime(arrivalTime.getHours() + ":" + arrivalTime.getMinutes()),
        flightDepartureTime: !departureTime 
            ? undefined 
            : HourMinuteToDateTime(departureTime.getHours() + ":" + departureTime.getMinutes()),
    }
}

export function MapAll(reservations: Reservation[]): Reservation[] {
    return reservations.map(Map);
}