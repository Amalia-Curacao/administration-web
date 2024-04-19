import { ToJsonHousekeepingTask } from "../extensions/ToJson";
import Map from "../mapping/housekeepingTask";
import HousekeepingTask from "../models/HousekeepingTask";
import Api from "./api";

export default class HousekeepingTasksApi {
    baseUrl: string = `${process.env.REACT_APP_API_URL}/HousekeepingTasks`;
    api : Api;

    constructor(token: string){
        this.api = new Api(token);
    }
    async create(housekeepingTask: HousekeepingTask) : Promise<HousekeepingTask> {
        return Map(await this.api.post(`${this.baseUrl}/Create`, ToJsonHousekeepingTask(housekeepingTask)));
    }
    async update(housekeepingTask: HousekeepingTask) : Promise<HousekeepingTask> {
        return Map(await this.api.post(`${this.baseUrl}/Update`, ToJsonHousekeepingTask(housekeepingTask)));
    }
    async delete(housekeepingTask: HousekeepingTask) : Promise<boolean>{
        return await this.api.post(`${this.baseUrl}/Delete/`, ToJsonHousekeepingTask(housekeepingTask));
    }
}