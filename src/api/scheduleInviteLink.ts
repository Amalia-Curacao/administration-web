import UserRoles from "../models/enums/UserRoles";
import Api from "./api";

export default class ScheduleInviteLinkApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/ScheduleInviteLinks`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }

    async redeem(code: string): Promise<UserRoles> {
        return await this.api.get(`${this.baseUrl}/Redeem/${code}`);
    }

    async housekeeper(scheduleId: number): Promise<string>{
        return await this.api.get(`${this.baseUrl}/Housekeeper/${scheduleId}`);
    }

    async manager(scheduleId: number): Promise<string>{
        return await this.api.get(`${this.baseUrl}/Manager/${scheduleId}`);
    }

    async owner(scheduleId: number): Promise<string>{
        return await this.api.get(`${this.baseUrl}/Owner/${scheduleId}`);
    }

    async admin(): Promise<string>{
        return await this.api.get(`${this.baseUrl}/Admin`);
    }
} 