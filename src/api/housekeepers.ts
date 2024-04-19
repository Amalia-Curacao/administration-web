import Map from "../mapping/string";
import Room from "../models/Room";
import User from "../models/User";
import Api from "./api";

export default class HousekeepersApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Housekeepers`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }

    async get(scheduleId: number): Promise<User[]> { 
        return await this.api.get(`${this.baseUrl}/Get/${scheduleId}`);
    }

    async note(userId: number, note: string, scheduleId: number): Promise<User>{
        return await this.api.get(`${this.baseUrl}/Note/${scheduleId}/${userId}/${Map(note)}`);
    }

    async rooms(scheduleId: number, userId?: number): Promise<Room[]>{
        return userId !== undefined
            ? await this.api.get(`${this.baseUrl}/Rooms/${scheduleId}/${userId}`) 
            : await this.api.get(`${this.baseUrl}/Rooms/${scheduleId}`);
    }
}