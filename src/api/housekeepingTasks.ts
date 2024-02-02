import axios from "axios";
import HousekeepingTask from "../models/HousekeepingTask";
import { ToJsonHousekeepingTask } from "../extensions/ToJson";
import Map from "../mapping/housekeepingTask";

export const housekeepingTasksApi = {
    create: (housekeepingTask: HousekeepingTask): Promise<HousekeepingTask> =>
        axios.post(process.env.REACT_APP_API_URL + "/HousekeepingTasks/Create", ToJsonHousekeepingTask(housekeepingTask))
            .then(response => Map(response.data)),
    
    update: (housekeepingTask: HousekeepingTask): Promise<HousekeepingTask> =>
        axios.post(process.env.REACT_APP_API_URL + "/HousekeepingTasks/Update", ToJsonHousekeepingTask(housekeepingTask))
            .then(response => Map(response.data)),

    delete: (housekeepingTask: HousekeepingTask): Promise<boolean> =>
        axios.post(process.env.REACT_APP_API_URL + "/HousekeepingTasks/Delete", ToJsonHousekeepingTask(housekeepingTask))
            .then(response => response.data),
}

export default housekeepingTasksApi;