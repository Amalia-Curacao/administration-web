import Room from "../models/Room";
import Api from "./api";

export default class RoomsApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Rooms`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }
    
    async get(scheduleId: number) : Promise<Room[]> {
        return await this.api.get(`${this.baseUrl}/Get/${scheduleId}`);
    }
    async create(room: Room) : Promise<Room> {
        return await this.api.post(`${this.baseUrl}/Create`, room);
    }
    async update(room: Room) : Promise<Room> {
        return await this.api.post(`${this.baseUrl}/Update`, room);
    }
    async delete(roomNumber: number, roomScheduleId: number) : Promise<boolean>{
        return await this.api.delete(`${this.baseUrl}/Delete/${roomNumber}/${roomScheduleId}`);
    }

}