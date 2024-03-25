import User from "../models/User";
import UserRoles from "../models/enums/UserRoles";
import Api from "./api";

export default class UserApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Users`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }

    async housekeepers(scheduleId: number): Promise<User[]> { 
        return await this.api.get(`${this.baseUrl}/Housekeepers/${scheduleId}`);
    }

    async update(user: User): Promise<User>{
        return await this.api.post(`${this.baseUrl}/Update`, user);
    }

    async role(scheduleId?: number): Promise<UserRoles> {
        return await this.api.get(`${this.baseUrl}/Role/${scheduleId ?? ""}`);
    }
}