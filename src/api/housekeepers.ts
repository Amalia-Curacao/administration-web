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
        return await this.api.get(`${this.baseUrl}/Note/${scheduleId}/${userId}/${note}`);
    }
}