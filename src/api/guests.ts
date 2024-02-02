import axios from "axios";
import { ToJsonGuest } from "../extensions/ToJson";
import Guest from "../models/Guest";

export const guestsApi = {
    getReservationGuests: (reservationId: number) : Promise<Guest[]> =>
        axios.get(process.env.REACT_APP_API_URL + "/Guests/GetReservationGuests/" + reservationId)
            .then(response => response.data),

    get: (guestId: number) : Promise<Guest> =>
        axios.get(process.env.REACT_APP_API_URL + "/Guests/Get/" + guestId)
            .then(response => response.data),

    set: (reservationId: number, guests: Guest[]) : Promise<Guest[]> =>
        axios.put(process.env.REACT_APP_API_URL + "/Guests/Set/" + reservationId, guests!.map(ToJsonGuest))
            .then(response => response.data),

    create: (guest: Guest) : Promise<Guest> =>
        axios.post(process.env.REACT_APP_API_URL + "/Guests/Create", ToJsonGuest(guest))
            .then(response => response.data),

    update: (guest: Guest) : Promise<Guest> =>
        axios.post(process.env.REACT_APP_API_URL + "/Guests/Update", ToJsonGuest(guest))
            .then(response => response.data),

    delete: (guestId: number) : Promise<boolean> =>
        axios.delete(process.env.REACT_APP_API_URL + "/Guests/Delete/" + guestId)
            .then(response => response.data),
}; 

export default guestsApi;