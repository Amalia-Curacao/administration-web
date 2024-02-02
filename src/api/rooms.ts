import axios from "axios";
import Room from "../models/Room";
import { MapAll } from "../mapping/room";

const roomsApi = {
    get: (scheduleId: number) : Promise<Room[]> =>
        axios.get(process.env.REACT_APP_API_URL + "/Rooms/Get/" + scheduleId)
              .then(response => MapAll(response.data)), 

 /* get: (roomNumber: number, scheduleId: number) : Promise<Room> =>
        axios.get(process.env.REACT_APP_API_URL + "/Rooms/Get/" + roomNumber + "/" + scheduleId)
              .then(response => Map(response.data)), */

 /* create: (room: Room) : Promise<Room> =>
        axios.post(process.env.REACT_APP_API_URL + "/Rooms/Create", room)
              .then(response => Map(response.data)), */

 /* update: (room: Room) : Promise<Room> =>
        axios.post(process.env.REACT_APP_API_URL + "/Rooms/Update", room)
              .then(response => Map(response.data)), */

 /* delete: (roomNumber: number, roomScheduleId: number) : Promise<boolean> =>
        axios.delete(process.env.REACT_APP_API_URL + "/Rooms/Delete/" + roomNumber + "/" + roomScheduleId)
              .then(response => response.data), */
}

export default roomsApi;