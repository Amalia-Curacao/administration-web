import Schedule from "../models/Schedule";
import Api from "./api";

export default class SchedulesApi{
    baseUrl: string = `${process.env.REACT_APP_API_URL}/Schedules`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }

    async get() : Promise<Schedule[]> {
        return await this.api.get(`${this.baseUrl}/Get`);
    }

    async create(scheduleName: string) : Promise<Schedule> {
        return await this.api.get(`${this.baseUrl}/Create/${scheduleName}`);
    }

    async update(schedule: Schedule) : Promise<Schedule> {
        return await this.api.post(`${this.baseUrl}/Update`, schedule);
    }

    async delete(scheduleId: number) : Promise<boolean>{
        return await this.api.delete(`${this.baseUrl}/Delete/${scheduleId}`);
    }
}