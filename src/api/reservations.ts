import axios from "axios";
import Reservation from "../models/Reservation";
import { ToJsonReservation } from "../extensions/ToJson";
import Map from "../mapping/reservation";

const reservationsApi = {
 /* get: (roomScheduleId: number, roomNumber: number) => 
        axios.get(process.env.REACT_APP_API_URL + "/Reservations/Get/" + roomScheduleId + "/" + roomNumber)
            .then(response => Map(response.data)), */
 /* get: (id: number) =>
        axios.get(process.env.REACT_APP_API_URL + "/Reservations/Get/" + id)
            .then(response => Map(response.data)), */

    create: (reservation: Reservation) : Promise<Reservation> =>
        axios.post(process.env.REACT_APP_API_URL + "/Reservations/Create", ToJsonReservation(reservation))
            .then(response => Map(response.data)),

    update: (reservation: Reservation) : Promise<Reservation> =>
        axios.post(process.env.REACT_APP_API_URL + "/Reservations/Update", ToJsonReservation(reservation))
        .then(response => Map(response.data)),
        
    delete: (reservationId: number) : Promise<boolean> =>
        axios.delete(process.env.REACT_APP_API_URL + "/Reservations/Delete" + reservationId)
        .then(response => response.data),
}

export default reservationsApi;