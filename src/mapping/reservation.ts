import { ToJsonDateOnly } from "../extensions/ToJson";
import Reservation from "../models/Reservation";
import { default as MapDateOnly } from "./dateonly";
import { default as MapTimeOnly } from "./timeonly";

export default function Map(reservation: Reservation): Reservation{
    return {
        ...reservation,
        checkIn: MapDateOnly(reservation.checkIn ? ToJsonDateOnly(reservation.checkIn) : ""),
        checkOut: MapDateOnly(reservation.checkOut ? ToJsonDateOnly(reservation.checkOut) : ""),
        flightArrivalTime: MapTimeOnly(reservation.flightArrivalTime as unknown as string),
        flightDepartureTime: MapTimeOnly(reservation.flightDepartureTime as unknown as string),
    }
}

export function MapAll(reservations: Reservation[]): Reservation[] {
    return reservations.map(Map);
}