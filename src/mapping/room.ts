import Room from "../models/Room";
import { MapAll as MapReservations } from "./reservation";
import { MapAll as MapHousekeepingTasks } from "./housekeepingTask";

export default function Map(room: Room): Room
{
    return {
        ...room,
        reservations: MapReservations(room.reservations ?? []),
        housekeepingTasks: MapHousekeepingTasks(room.housekeepingTasks ?? [])
    }
}

export function MapAll(rooms: Room[]): Room[]
{
    return rooms.map(Map);
}